"use client";

export function InfoRow({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="flex justify-between py-1">
      <span className="opacity-70">{label}</span>
      <span className="text-brand-red">{value}</span>
    </div>
  );
}
