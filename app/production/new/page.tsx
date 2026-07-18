import type { Metadata } from "next"

import { DailyProductionForm } from "@/components/production/daily-production-form"

export const metadata: Metadata = {
  title: "新增日產表｜工廠智流",
  description: "建立與填寫工廠智流每日生產報告。",
}

export default function NewProductionPage() {
  return <DailyProductionForm />
}
