"use client";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/5 p-6 ring-1 ring-brand-red/40">
      {children}
    </div>
  );
}
