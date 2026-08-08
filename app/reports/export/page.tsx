import type { Metadata } from "next"
import { Download } from "lucide-react"

import { PlaceholderPage } from "@/components/dashboard/placeholder-page"

export const metadata: Metadata = { title: "匯出報表｜工廠智流" }

export default function ExportReportsPage() {
  return <PlaceholderPage title="匯出報表" description="選擇日期與格式後匯出生產資料的功能即將在此提供。" icon={Download} />
}
