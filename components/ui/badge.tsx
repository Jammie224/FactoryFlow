import * as React from "react"
import { cn } from "@/lib/utils"

type Status = "success" | "warning" | "neutral"
const styles: Record<Status, string> = {
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  neutral: "bg-slate-100 text-slate-600",
}
export function Badge({ status, className, ...props }: React.ComponentProps<"span"> & { status: Status }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-black/5", styles[status], className)} {...props} />
}
