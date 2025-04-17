import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

// Define the asset categories based on the Minio configuration
export type AssetCategory = "profile" | "hackathon" | "general";

interface AssetCategorySelectProps {
  value: AssetCategory;
  onValueChange: (value: AssetCategory) => void;
  className?: string;
}

export function AssetCategorySelect({
  value,
  onValueChange,
  className,
}: AssetCategorySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="profile">Profile</SelectItem>
        <SelectItem value="hackathon">Hackathon</SelectItem>
        <SelectItem value="general">General</SelectItem>
      </SelectContent>
    </Select>
  );
} 