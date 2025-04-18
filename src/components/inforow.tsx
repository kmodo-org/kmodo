"use client";

interface InfoRowProps {
  label: string;
  value: number | string;
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between py-1">
      <span className="opacity-70">{label}</span>
      <span>{value}</span>
    </div>
  );
}
