import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Props { title: string; value: string; detail: string; trend: string; icon: LucideIcon; positive?: boolean }
export function MetricCard({ title, value, detail, trend, icon: Icon, positive = true }: Props) {
  const Trend = positive ? ArrowUpRight : ArrowDownRight
  return (
    <Card className="group transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-5">
        <div className="mb-5 flex justify-between"><p className="text-sm font-medium text-slate-500">{title}</p><div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100"><Icon className="size-[18px]" /></div></div>
        <p className="text-[28px] font-semibold leading-none tracking-[-.035em]">{value}</p>
        <div className="mt-4 flex items-center gap-2"><span className={positive ? "flex items-center text-xs font-semibold text-blue-600" : "flex items-center text-xs font-semibold text-amber-600"}><Trend className="mr-0.5 size-3.5" />{trend}</span><span className="text-xs text-slate-400">{detail}</span></div>
      </CardContent>
    </Card>
  )
}
