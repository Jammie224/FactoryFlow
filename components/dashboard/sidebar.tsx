"use client"

import { BarChart3, Boxes, Download, Factory, FileText, Gauge, Settings, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  { label: "儀表板", icon: Gauge, href: "/" },
  { label: "生產管理", icon: Boxes, href: "/production" },
  { label: "日產報表", icon: FileText, href: "/reports" },
  { label: "統計分析", icon: BarChart3, href: "/analytics" },
  { label: "匯出報表", icon: Download, href: "/reports/export" },
  { label: "使用者管理", icon: Users, href: "/settings/users" },
  { label: "系統設定", icon: Settings, href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const activeHref = navigationItems
    .filter((item) => item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-blue-900 bg-[#0c2855] px-4 py-5 text-white lg:flex">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500 text-white ring-1 ring-white/20"><Factory className="size-5" /></div>
        <div><p className="text-[17px] font-semibold">工廠智流</p><p className="text-[10px] tracking-[.2em] text-slate-400">生產管理系統</p></div>
      </div>
      <p className="mb-3 px-3 text-[10px] font-semibold tracking-[.18em] text-slate-500">主要功能</p>
      <nav className="space-y-1" aria-label="主要導覽">
        {navigationItems.map((item) => {
          const active = item.href === activeHref

          return (
            <Link key={item.label} href={item.href} aria-current={active ? "page" : undefined} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition", active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white")}>
              <item.icon className={cn("size-[18px]", active && "text-blue-300")} />
              {item.label}
              {item.label === "生產管理" && <span className="ml-auto rounded-md bg-blue-400/15 px-1.5 py-0.5 text-[10px] text-blue-200">8</span>}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-white/8 bg-white/[.04] p-4">
        <div className="mb-3 flex justify-between text-xs"><span className="text-slate-300">全廠效率</span><span className="font-semibold text-blue-300">91%</span></div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[91%] rounded-full bg-blue-400" /></div>
        <p className="mt-3 text-xs leading-5 text-slate-500">較上週平均提升 3.2%</p>
      </div>
    </aside>
  )
}
