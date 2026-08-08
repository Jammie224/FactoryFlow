import type { Metadata } from "next"
import { FileText } from "lucide-react"

import { PlaceholderPage } from "@/components/dashboard/placeholder-page"

export const metadata: Metadata = { title: "日產報表｜工廠智流" }

export default function ReportsPage() {
  return <PlaceholderPage title="日產報表" description="每日生產紀錄與報表查詢功能即將在此提供。" icon={FileText} />
}
