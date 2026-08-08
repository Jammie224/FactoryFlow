import type { LucideIcon } from "lucide-react"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { Card, CardContent } from "@/components/ui/card"

interface PlaceholderPageProps {
  title: string
  description: string
  icon: LucideIcon
}

export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center">
            <Card className="w-full max-w-xl">
              <CardContent className="flex flex-col items-center p-10 text-center sm:p-14">
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="size-7" />
                </div>
                <h1 className="text-2xl font-semibold tracking-[-.03em] text-slate-950">{title}</h1>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">{description}</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
