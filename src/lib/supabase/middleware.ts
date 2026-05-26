import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminPath = pathname.startsWith("/admin");
  const isProtectedPath = pathname.startsWith("/member") || isAdminPath;

  const demoSession = request.cookies.get("opencode_session")?.value;
  let role: string | null = null;
  if (demoSession) {
    try { role = JSON.parse(decodeURIComponent(demoSession)).role; } catch {}
  }

  const res = NextResponse.next();
  res.headers.set("x-debug-role", role ?? "none");
  res.headers.set("x-debug-path", pathname);

  if (isProtectedPath && !role) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (role && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = role === "super_admin" || role === "admin" ? "/admin/dashboard" : "/member/dashboard";
    return NextResponse.redirect(url);
  }

  if (role && isAdminPath && role !== "super_admin" && role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/member/dashboard";
    return NextResponse.redirect(url);
  }

  return res;
}
