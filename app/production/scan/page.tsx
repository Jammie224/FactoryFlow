import type { Metadata } from "next"

import { ProductionScan } from "@/components/production/production-scan"

export const metadata: Metadata = {
  title: "AI 日產表辨識｜工廠智流",
  description: "上傳紙本日產表，自動辨識並填入系統。",
}

export default function ProductionScanPage() {
  return <ProductionScan />
}
