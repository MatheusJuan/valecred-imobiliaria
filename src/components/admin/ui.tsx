import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`min-w-0 rounded-card bg-white p-6 shadow-sm ring-1 ring-black/5 ${className}`}>{children}</div>;
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

const tones = {
  green: "bg-brand/10 text-brand",
  yellow: "bg-accent/30 text-ink",
  gray: "bg-neutral-100 text-muted",
  red: "bg-red-100 text-red-700",
  blue: "bg-sky-100 text-sky-700",
};

export function Badge({ tone = "gray", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted";
export const td = "px-4 py-3 text-sm";
