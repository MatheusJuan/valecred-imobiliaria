"use client";

import { usePathname } from "next/navigation";

// Esconde header/rodapé/WhatsApp do site nas telas do painel e no login.
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path.startsWith("/admin") || path === "/login") return null;
  return <>{children}</>;
}
