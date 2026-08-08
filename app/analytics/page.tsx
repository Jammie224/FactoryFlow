import type { Metadata } from "next"
import { BarChart3 } from "lucide-react"

import { PlaceholderPage } from "@/components/dashboard/placeholder-page"

export const metadata: Metadata = { title: "統計分析｜工廠智流" }

export default function AnalyticsPage() {
  return <PlaceholderPage title="統計分析" description="產量、效率與趨勢分析功能即將在此提供。" icon={BarChart3} />
}
