"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  ClipboardCopy,
  Factory,
  FileText,
  ScanText,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { OCR_STORAGE_KEY, type OcrResult } from "@/lib/ocr"

const fields = [
  ["serial", "編別", "w-20"],
  ["orderNo", "訂單號", "w-32"],
  ["partNo", "料號", "w-32"],
  ["color", "顏色", "w-24"],
  ["productName", "品名", "w-40"],
  ["quantity", "足數數量", "w-28"],
  ["processing", "加工", "w-28"],
  ["barcode", "條碼", "w-36"],
  ["formula", "型別配方", "w-36"],
  ["skin", "過皮／後皮", "w-32"],
  ["preCustomer", "客前", "w-24"],
  ["remarks", "備註", "w-44"],
] as const

type FieldName = (typeof fields)[number][0]
type ProductionRow = Record<FieldName, string> & { id: number }

const createRow = (id: number, values: Partial<ProductionRow> = {}): ProductionRow => ({
  id,
  serial: "",
  orderNo: "",
  partNo: "",
  color: "",
  productName: "",
  quantity: "",
  processing: "",
  barcode: "",
  formula: "",
  skin: "",
  preCustomer: "",
  remarks: "",
  ...values,
})

const initialRows = [
  createRow(1, { serial: "甲01", orderNo: "訂-260718-01", partNo: "料-8021", color: "霧黑", productName: "驅動器外殼", quantity: "1200", processing: "精密切削", barcode: "4718021001", formula: "型八／配二", skin: "後皮", preCustomer: "是" }),
  createRow(2, { serial: "甲02", orderNo: "訂-260718-02", partNo: "料-6405", color: "銀灰", productName: "控制閥本體", quantity: "850", processing: "沖壓", barcode: "4716405002", formula: "型十二／配一", skin: "過皮", preCustomer: "否" }),
]

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-sm font-medium text-slate-700">{children}</label>
}

export function DailyProductionForm() {
  const [rows, setRows] = useState(initialRows)
  const [machine, setMachine] = useState("八號｜射出成型機")
  const [date, setDate] = useState("2026-07-18")
  const [shift, setShift] = useState("早班（06:00–14:00）")
  const [preparedBy, setPreparedBy] = useState("陳志明")
  const [notes, setNotes] = useState("")
  const nextId = useRef(3)

  useEffect(() => {
    const storedResult = sessionStorage.getItem(OCR_STORAGE_KEY)
    if (!storedResult) return

    try {
      const ocr = JSON.parse(storedResult) as OcrResult
      const timer = window.setTimeout(() => {
        const measurements = [ocr.width && `寬度：${ocr.width}`, ocr.weight && `重量：${ocr.weight}`].filter(Boolean).join("；")
        setMachine(ocr.machine)
        setDate(ocr.date)
        setShift(ocr.shift)
        setPreparedBy(ocr.operator)
        setNotes(ocr.remarks)
        setRows([createRow(nextId.current++, {
          partNo: ocr.productNumber,
          productName: ocr.productName,
          color: ocr.color,
          quantity: ocr.quantity,
          processing: ocr.process,
          formula: ocr.formula,
          remarks: [ocr.remarks, measurements].filter(Boolean).join("；"),
        })])
      }, 0)
      sessionStorage.removeItem(OCR_STORAGE_KEY)
      return () => window.clearTimeout(timer)
    } catch {
      sessionStorage.removeItem(OCR_STORAGE_KEY)
    }
  }, [])

  const totalQuantity = useMemo(
    () => rows.reduce((total, row) => total + (Number.parseFloat(row.quantity) || 0), 0),
    [rows]
  )

  function updateRow(id: number, field: FieldName, value: string) {
    setRows((current) => current.map((row) => row.id === id ? { ...row, [field]: value } : row))
  }

  function addRow() {
    setRows((current) => [...current, createRow(nextId.current++)])
  }

  function duplicateRow(id: number) {
    setRows((current) => {
      const index = current.findIndex((row) => row.id === id)
      if (index < 0) return current
      const copy = { ...current[index], id: nextId.current++, serial: `${current[index].serial}-副本` }
      return [...current.slice(0, index + 1), copy, ...current.slice(index + 1)]
    })
  }

  function deleteRow(id: number) {
    setRows((current) => current.filter((row) => row.id !== id))
  }

  function clearForm() {
    setRows([createRow(nextId.current++)])
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 rounded-lg text-slate-600 transition hover:text-blue-700">
            <ArrowLeft className="size-4" />
            <span className="hidden text-sm font-medium sm:inline">返回儀表板</span>
          </Link>
          <div className="mx-1 h-6 w-px bg-slate-200 sm:mx-3" />
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-white"><Factory className="size-5" /></div>
          <div><p className="text-sm font-semibold tracking-tight sm:text-base">工廠智流</p><p className="hidden text-[10px] tracking-[.18em] text-slate-400 sm:block">生產管理系統</p></div>
          <div className="ml-auto hidden items-center gap-2 text-xs text-slate-500 md:flex"><span className="size-2 rounded-full bg-blue-500" />尚未儲存</div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:py-8">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600"><FileText className="size-4" />生產管理 / 新增報表</div>
            <h1 className="text-2xl font-semibold tracking-[-.03em] sm:text-3xl">新增日產表</h1>
            <p className="mt-2 text-sm text-slate-500">記錄每日機台生產明細、加工資訊與完成數量。</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="lg" render={<Link href="/production/scan" />}><ScanText data-icon="inline-start" />AI 辨識</Button>
            <Button variant="outline" size="lg"><Save data-icon="inline-start" />儲存草稿</Button>
            <Button variant="outline" size="lg" onClick={clearForm}><RotateCcw data-icon="inline-start" />清空</Button>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700"><Check data-icon="inline-start" />送出</Button>
          </div>
        </div>

        <Card className="mb-4">
          <CardHeader className="border-b border-slate-100"><CardTitle>基本資料</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-3">
            <div><FieldLabel>機台</FieldLabel><Input value={machine} onChange={(event) => setMachine(event.target.value)} /></div>
            <div><FieldLabel>日期</FieldLabel><Input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></div>
            <div className="sm:col-span-2 lg:col-span-1"><FieldLabel>班別</FieldLabel><Input value={shift} onChange={(event) => setShift(event.target.value)} /></div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex-row items-center border-b border-slate-100">
            <div><CardTitle>生產明細</CardTitle><p className="mt-1 text-sm text-slate-500">填寫訂單與實際生產資料</p></div>
            <Button className="ml-auto bg-blue-600 hover:bg-blue-700" onClick={addRow}><Plus data-icon="inline-start" />新增一列</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1680px] border-collapse text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="w-14 border-b border-r border-slate-200 px-3 py-3 text-center text-xs font-semibold text-slate-500">#</th>
                    {fields.map(([, label, width]) => <th key={label} className={cn("border-b border-r border-slate-200 px-2.5 py-3 text-xs font-semibold text-slate-600", width)}>{label}</th>)}
                    <th className="sticky right-0 w-24 border-b border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-semibold text-slate-600">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.id} className="group hover:bg-blue-50/30">
                      <td className="border-b border-r border-slate-100 px-3 py-2 text-center text-xs font-medium text-slate-400">{String(index + 1).padStart(2, "0")}</td>
                      {fields.map(([field, label]) => (
                        <td key={field} className="border-b border-r border-slate-100 p-1.5">
                          <Input
                            aria-label={`${label}，第 ${index + 1} 列`}
                            type={field === "quantity" ? "number" : "text"}
                            min={field === "quantity" ? "0" : undefined}
                            value={row[field]}
                            onChange={(event) => updateRow(row.id, field, event.target.value)}
                            className={cn("h-9 rounded-lg border-transparent bg-transparent px-2.5 focus:bg-white", field === "quantity" && "text-right font-medium")}
                          />
                        </td>
                      ))}
                      <td className="sticky right-0 border-b border-slate-100 bg-white px-2 group-hover:bg-[#f8fbff]">
                        <div className="flex justify-center gap-1">
                          <Button variant="ghost" size="icon-sm" onClick={() => duplicateRow(row.id)} aria-label={`複製第 ${index + 1} 列`} title="複製"><ClipboardCopy /></Button>
                          <Button variant="ghost" size="icon-sm" className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => deleteRow(row.id)} aria-label={`刪除第 ${index + 1} 列`} title="刪除"><Trash2 /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50/70">
                    <td colSpan={6} className="border-t border-blue-100 px-4 py-4 text-right text-sm font-semibold text-slate-700">足數數量合計</td>
                    <td className="border-t border-blue-100 px-3 py-4 text-right text-base font-bold text-blue-700">{totalQuantity.toLocaleString("zh-TW")}</td>
                    <td colSpan={7} className="border-t border-blue-100 px-4 py-4 text-xs text-slate-500">系統依各列「足數數量」自動計算</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {rows.length === 0 && <div className="flex flex-col items-center px-4 py-12 text-center"><p className="text-sm font-medium text-slate-600">目前沒有生產明細</p><Button variant="outline" className="mt-3" onClick={addRow}><Plus />新增第一列</Button></div>}
          </CardContent>
        </Card>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px_240px]">
          <Card><CardContent className="p-5"><FieldLabel>注意事項</FieldLabel><textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-24 w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10" placeholder="請輸入交接事項、品質異常或其他注意事項…" /></CardContent></Card>
          <Card><CardContent className="p-5"><FieldLabel>單位主管</FieldLabel><Input placeholder="主管姓名" /><div className="mt-5 border-b border-dashed border-slate-300 pb-2 text-xs text-slate-400">簽核欄位</div></CardContent></Card>
          <Card><CardContent className="p-5"><FieldLabel>填表人</FieldLabel><Input value={preparedBy} onChange={(event) => setPreparedBy(event.target.value)} /><div className="mt-5 border-b border-dashed border-slate-300 pb-2 text-xs text-slate-400">填表人簽名</div></CardContent></Card>
        </section>

        <div className="sticky bottom-0 z-20 -mx-4 mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,.06)] backdrop-blur sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:rounded-2xl lg:border">
          <Button variant="outline" size="lg"><Save data-icon="inline-start" />儲存草稿</Button>
          <Button size="lg" className="bg-blue-600 px-6 hover:bg-blue-700"><Check data-icon="inline-start" />送出</Button>
          <Button variant="outline" size="lg" onClick={clearForm}><RotateCcw data-icon="inline-start" />清空</Button>
        </div>
      </main>
    </div>
  )
}
