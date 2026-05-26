import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.includes(".supabase.co")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/member/dashboard";
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        const isAdmin = profile?.role === "super_admin" || profile?.role === "admin";
        const role = profile?.role ?? "member";
        const redirectUrl = `${origin}${isAdmin ? "/admin/dashboard" : next}`;
        const res = NextResponse.redirect(redirectUrl);
        res.cookies.set("opencode_session", encodeURIComponent(JSON.stringify({ email: user.email, role })), { path: "/", maxAge: 86400 });
        return res;
      }
    }
  }
  return NextResponse.redirect(`${origin}/login`);
}
