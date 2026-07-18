import { Bell, Factory, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Topbar() {
  return (
    <header className="flex h-[76px] shrink-0 items-center border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mr-5 flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="開啟導覽"><Menu /></Button>
        <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white"><Factory className="size-4" /></div>
        <span className="hidden font-semibold tracking-tight text-slate-900 xl:inline">工廠智流</span>
      </div>
      <div className="relative hidden w-full max-w-md sm:block">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input aria-label="搜尋" placeholder="搜尋訂單、機台或報表..." className="bg-slate-50 pl-10" />
      </div>
      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <Button variant="ghost" size="icon" className="relative" aria-label="通知"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-blue-600 ring-2 ring-white" /></Button>
        <div className="h-8 w-px bg-slate-200" />
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">陳</div>
          <div className="hidden sm:block"><p className="text-sm font-semibold leading-4">陳志明</p><p className="mt-1 text-xs text-slate-500">廠務主管</p></div>
        </div>
      </div>
    </header>
  )
}
