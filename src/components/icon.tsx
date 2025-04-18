// components/StatusBadge.tsx
import { Ban, CirclePause, CircleCheckBig, LucideIcon } from "lucide-react";

type Status = "pending" | "accepted" | "rejected";

const styleMap: Record<
  Status,
  { Icon: LucideIcon; bg: string; text: string } > = {
  pending:  { Icon: CirclePause,      bg: "bg-yellow-400/10", text: "text-yellow-400" },
  accepted: { Icon: CircleCheckBig,   bg: "bg-green-600/10",  text: "text-green-600" },
  rejected: { Icon: Ban,              bg: "bg-red-600/10",    text: "text-red-600" },
};

export function StatusBadge({ status }: { status: Status }) {
  const { Icon, bg, text } = styleMap[status];
  return (
    <div className={`${bg} p-3 rounded-lg`}>
      <Icon className={`w-6 h-6 ${text}`} />
    </div>
  );
}
