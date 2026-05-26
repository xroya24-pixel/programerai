import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function Refreshable({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <div key={pathname}>{children}</div>;
}
