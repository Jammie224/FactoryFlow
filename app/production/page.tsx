import type { Metadata } from "next"
import { Boxes } from "lucide-react"

import { PlaceholderPage } from "@/components/dashboard/placeholder-page"

export const metadata: Metadata = { title: "生產管理｜工廠智流" }

export default function ProductionPage() {
  return <PlaceholderPage title="生產管理" description="生產排程、機台與工單管理功能即將在此提供。" icon={Boxes} />
}
