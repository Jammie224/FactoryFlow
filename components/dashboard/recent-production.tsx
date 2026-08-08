import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const productionRecords = [
  { date: "07/18", machine: "八號射出機", orderNumber: "SO-260718-01", partNumber: "FF-8021", productName: "驅動器外殼", quantity: "1,240", status: "生產中" },
  { date: "07/18", machine: "四號沖壓機", orderNumber: "SO-260718-02", partNumber: "FF-6405", productName: "控制閥本體", quantity: "860", status: "已完成" },
  { date: "07/18", machine: "二號組裝機", orderNumber: "SO-260718-03", partNumber: "FF-3218", productName: "轉子模組", quantity: "2,100", status: "生產中" },
  { date: "07/17", machine: "一號切割機", orderNumber: "SO-260717-08", partNumber: "FF-1184", productName: "固定支架", quantity: "540", status: "待生產" },
] as const

const headers = ["日期", "機台", "訂單號", "料號", "品名", "數量", "狀態"]

export function RecentProduction() {
  return (
    <Card>
      <CardHeader>
        <div><CardTitle>最近生產紀錄</CardTitle><CardDescription className="mt-1">全廠最新生產與訂單進度</CardDescription></div>
        <Link href="/production" className={buttonVariants({ variant: "outline", className: "hidden sm:inline-flex" })}>查看全部 <ArrowRight data-icon="inline-end" /></Link>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0 pb-1">
        <table className="w-full min-w-[820px] text-left">
          <thead><tr className="border-y border-slate-100 bg-slate-50/70 text-xs text-slate-500">{headers.map((header) => <th key={header} className="px-4 py-3 font-semibold">{header}</th>)}</tr></thead>
          <tbody>
            {productionRecords.map((record) => (
              <tr key={record.orderNumber} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-4 text-sm text-slate-500">{record.date}</td>
                <td className="px-4 py-4 text-sm font-medium text-slate-700">{record.machine}</td>
                <td className="px-4 py-4 text-sm font-semibold text-slate-800">{record.orderNumber}</td>
                <td className="px-4 py-4 text-sm text-slate-500">{record.partNumber}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{record.productName}</td>
                <td className="px-4 py-4 text-sm font-medium text-slate-700">{record.quantity}</td>
                <td className="px-4 py-4"><Badge status={record.status === "已完成" ? "success" : record.status === "待生產" ? "neutral" : "warning"}>{record.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
