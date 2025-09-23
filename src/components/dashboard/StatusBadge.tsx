import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-success/20 text-success border-success/30";
      case "expired":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "expiring":
        return "bg-warning/20 text-warning border-warning/30";
      case "popular":
        return "bg-primary/20 text-primary border-primary/30";
      case "new":
        return "bg-accent/20 text-accent border-accent/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        getStatusStyles(status),
        className
      )}
    >
      {formatStatus(status)}
    </span>
  );
}