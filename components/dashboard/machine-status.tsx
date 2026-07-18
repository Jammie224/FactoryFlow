import { ArrowRight, CircleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const statusItems = [
  { label: "運作中", count: 18, description: "生產線正常運作", color: "bg-blue-600", surface: "bg-blue-50" },
  { label: "待機", count: 1, description: "等待下一筆工單", color: "bg-slate-400", surface: "bg-slate-50" },
  { label: "維修中", count: 1, description: "預計今日完成維修", color: "bg-amber-500", surface: "bg-amber-50" },
]

export function MachineStatus() {
  return (
    <Card>
      <CardHeader>
        <div><CardTitle>機台狀態</CardTitle><CardDescription className="mt-1">全廠機台即時狀況</CardDescription></div>
        <Button variant="ghost" size="icon" aria-label="查看所有機台"><ArrowRight /></Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {statusItems.map((item) => (
          <div key={item.label} className={`flex items-center gap-4 rounded-xl p-4 ${item.surface}`}>
            <div className={`size-2.5 shrink-0 rounded-full ${item.color}`} />
            <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-800">{item.label}</p><p className="mt-0.5 text-xs text-slate-500">{item.description}</p></div>
            <p className="text-2xl font-semibold tracking-tight text-slate-900">{item.count}<span className="ml-1 text-xs font-medium text-slate-500">台</span></p>
          </div>
        ))}
        <div className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/60 p-3 text-xs text-amber-800"><CircleAlert className="size-4 shrink-0" /><span>一台機台需要處理</span></div>
      </CardContent>
    </Card>
  )
}
