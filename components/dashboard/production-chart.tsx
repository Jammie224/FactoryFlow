import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const dailyValues = [36, 46, 42, 58, 66, 61, 76, 71, 84, 80, 89, 86]
const targetValues = [43, 50, 48, 61, 60, 67, 70, 77, 78, 85, 83, 92]
const weeklyValues = [
  { day: "一", value: 68 },
  { day: "二", value: 82 },
  { day: "三", value: 72 },
  { day: "四", value: 91 },
  { day: "五", value: 84 },
  { day: "六", value: 61 },
  { day: "日", value: 44 },
]

function ChartHeader({ title, description }: { title: string; description: string }) {
  return (
    <CardHeader>
      <div><CardTitle>{title}</CardTitle><CardDescription className="mt-1">{description}</CardDescription></div>
      <Button variant="ghost" size="icon" aria-label={`${title}選項`}><MoreHorizontal /></Button>
    </CardHeader>
  )
}

export function DailyProductionChart() {
  return (
    <Card className="min-w-0">
      <ChartHeader title="每日生產趨勢" description="每小時實際產量與目標產量" />
      <CardContent>
        <div className="mb-5 flex gap-5 text-xs text-slate-500"><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-blue-600" />實際產量</span><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-blue-200" />目標產量</span></div>
        <div className="flex h-56 gap-3">
          <div className="flex w-8 flex-col justify-between pb-6 text-right text-[10px] text-slate-400"><span>1000</span><span>750</span><span>500</span><span>250</span><span>0</span></div>
          <div className="relative flex flex-1 items-end gap-2 border-b border-slate-200 pb-6">
            {[0, 25, 50, 75].map((top) => <div key={top} className="absolute inset-x-0 h-px bg-slate-100" style={{ top: `${top}%` }} />)}
            {dailyValues.map((value, index) => (
              <div key={index} className="relative z-10 flex h-full flex-1 items-end justify-center gap-0.5">
                <div className="w-full max-w-3 rounded-t-sm bg-blue-600 transition hover:bg-blue-500" style={{ height: `${value}%` }} />
                <div className="w-full max-w-3 rounded-t-sm bg-blue-200" style={{ height: `${targetValues[index]}%` }} />
                {index % 2 === 0 && <span className="absolute -bottom-5 text-[10px] text-slate-400">{String(index + 6).padStart(2, "0")} 時</span>}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function WeeklyProductionChart() {
  return (
    <Card className="min-w-0">
      <ChartHeader title="每週生產趨勢" description="本週每日生產數量" />
      <CardContent>
        <div className="mb-5 flex items-end justify-between">
          <div><p className="text-2xl font-semibold tracking-tight">52,840</p><p className="mt-1 text-xs text-slate-500">本週總生產數量</p></div>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">提升 9.4%</span>
        </div>
        <div className="relative flex h-48 items-end gap-3 border-b border-slate-200 pb-7">
          {[25, 50, 75].map((top) => <div key={top} className="absolute inset-x-0 h-px bg-slate-100" style={{ top: `${top}%` }} />)}
          {weeklyValues.map((item) => (
            <div key={item.day} className="relative z-10 flex h-full flex-1 items-end justify-center">
              <div className="w-full max-w-8 rounded-t-md bg-blue-100 p-1 transition hover:bg-blue-200" style={{ height: `${item.value}%` }}><div className="h-full w-full rounded-t bg-blue-600" /></div>
              <span className="absolute -bottom-5 text-[10px] font-medium text-slate-500">週{item.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
