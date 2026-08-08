import type { Metadata } from "next"
import { Settings } from "lucide-react"

import { PlaceholderPage } from "@/components/dashboard/placeholder-page"

export const metadata: Metadata = { title: "系統設定｜工廠智流" }

export default function SettingsPage() {
  return <PlaceholderPage title="系統設定" description="工廠、通知與系統偏好設定即將在此提供。" icon={Settings} />
}
