import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Cog,
  PackageCheck,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { MachineStatus } from "./machine-status";
import { MetricCard } from "./metric-card";
import {
  DailyProductionChart,
  WeeklyProductionChart,
} from "./production-chart";
import { RecentProduction } from "./recent-production";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-1 text-sm font-medium text-blue-600">
                  七月十八日，星期六
                </p>
                <h1 className="text-2xl font-semibold tracking-[-.03em] text-slate-950 sm:text-[30px]">
                  生產營運總覽
                </h1>
                <p className="mt-1.5 text-sm text-slate-500">
                  即時掌握生產進度、訂單與機台運作狀況。
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="lg">
                  <CalendarDays data-icon="inline-start" />
                  今日
                </Button>
                <Link href="/production/new" className={buttonVariants({ size: "lg", className: "bg-blue-600 hover:bg-blue-700" })}>
                  <Plus data-icon="inline-start" />
                  新增報表
                </Link>
              </div>
            </div>

            <section
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
              aria-label="生產指標"
            >
              <MetricCard
                href="/production"
                title="今日生產數量"
                value="8,420"
                detail="較昨日"
                trend="8.2%"
                icon={PackageCheck}
              />
              <MetricCard
                href="/reports"
                title="今日訂單數"
                value="48"
                detail="今日待完成 6 筆"
                trend="5.4%"
                icon={ClipboardList}
              />
              <MetricCard
                href="/production"
                title="運作機台"
                value="18 / 20"
                detail="2 台暫停運作"
                trend="1 台"
                icon={Cog}
                positive={false}
              />
              <MetricCard
                href="/analytics"
                title="完成率"
                value="94.6%"
                detail="較上週"
                trend="3.1%"
                icon={CheckCircle2}
              />
            </section>

            <section
              className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,.85fr)]"
              aria-label="生產趨勢"
            >
              <DailyProductionChart />
              <WeeklyProductionChart />
            </section>

            <section
              className="mt-4 grid items-start gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,.65fr)]"
              aria-label="營運明細"
            >
              <RecentProduction />
              <MachineStatus />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
