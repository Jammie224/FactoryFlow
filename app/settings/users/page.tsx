import type { Metadata } from "next"
import { Users } from "lucide-react"

import { PlaceholderPage } from "@/components/dashboard/placeholder-page"

export const metadata: Metadata = { title: "使用者管理｜工廠智流" }

export default function UsersPage() {
  return <PlaceholderPage title="使用者管理" description="使用者帳號、角色與權限管理功能即將在此提供。" icon={Users} />
}
