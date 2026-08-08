"use client"

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, FileImage, LoaderCircle, ScanText, Upload, WandSparkles } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { OCR_STORAGE_KEY, ocrFieldNames, type OcrResult } from "@/lib/ocr"

const labels: Record<(typeof ocrFieldNames)[number], string> = {
  date: "日期", machine: "機台", shift: "班別", operator: "操作員",
  productNumber: "產品編號", productName: "產品名稱", color: "顏色",
  quantity: "數量", process: "製程", width: "寬度", weight: "重量",
  formula: "配方", remarks: "備註",
}

export function ProductionScan() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [result, setResult] = useState<OcrResult | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }, [previewUrl])

  function chooseFile(nextFile?: File) {
    if (!nextFile) return
    if (!["image/jpeg", "image/png", "image/webp"].includes(nextFile.type)) {
      setError("請選擇 JPG、PNG 或 WebP 圖片。")
      return
    }
    if (nextFile.size > 10 * 1024 * 1024) {
      setError("圖片不可超過 10 MB。")
      return
    }
    setFile(nextFile)
    setPreviewUrl(URL.createObjectURL(nextFile))
    setResult(null)
    setError("")
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    chooseFile(event.dataTransfer.files[0])
  }

  async function scanImage() {
    if (!file) return setError("請先選擇日產表圖片。")
    setIsLoading(true)
    setError("")
    setResult(null)
    const body = new FormData()
    body.append("image", file)
    try {
      const response = await fetch("/api/ocr", { method: "POST", body })
      const data = await response.json() as OcrResult & { error?: string }
      if (!response.ok) throw new Error(data.error || "辨識失敗。")
      setResult(data)
    } catch (scanError) {
      setError(scanError instanceof Error ? scanError.message : "辨識失敗，請稍後再試。")
    } finally {
      setIsLoading(false)
    }
  }

  function fillForm() {
    if (!result) return
    sessionStorage.setItem(OCR_STORAGE_KEY, JSON.stringify(result))
    router.push("/production/new?source=ocr")
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link href="/production/new" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700"><ArrowLeft className="size-4" />返回日產表</Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600"><ScanText className="size-4" />生產管理 / AI 辨識</div>
          <h1 className="text-3xl font-semibold tracking-[-.03em]">AI 日產表辨識</h1>
          <p className="mt-2 text-sm text-slate-500">上傳紙本日產表，自動辨識並填入系統。</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>上傳日產表</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div
                role="button" tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") inputRef.current?.click() }}
                onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)} onDrop={onDrop}
                className={cn("flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50/40", isDragging && "border-blue-500 bg-blue-50")}
              >
                <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600"><Upload className="size-6" /></div>
                <p className="font-medium">拖放圖片至此，或點擊選擇檔案</p>
                <p className="mt-1 text-xs text-slate-500">支援 JPG、PNG、WebP，最大 10 MB</p>
                <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event: ChangeEvent<HTMLInputElement>) => chooseFile(event.target.files?.[0])} />
              </div>
              {previewUrl && <div className="relative h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"><Image src={previewUrl} alt="日產表圖片預覽" fill unoptimized className="object-contain" /></div>}
              {file && <p className="flex items-center gap-2 truncate text-sm text-slate-600"><FileImage className="size-4 text-blue-600" />{file.name}</p>}
              {error && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700" disabled={!file || isLoading} onClick={scanImage}>
                {isLoading ? <><LoaderCircle className="animate-spin" />正在辨識日產表…</> : <><WandSparkles />上傳並開始辨識</>}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>辨識結果預覽</CardTitle></CardHeader>
            <CardContent>
              {!result ? <div className="flex min-h-72 flex-col items-center justify-center text-center text-slate-400"><ScanText className="mb-3 size-10" /><p className="text-sm">完成辨識後，結果會顯示於此。</p></div> : <>
                <dl className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
                  {ocrFieldNames.map((field) => <div key={field} className={cn("border-b border-slate-100 pb-3", field === "remarks" && "sm:col-span-2")}><dt className="text-xs font-medium text-slate-400">{labels[field]}</dt><dd className="mt-1 break-words text-sm text-slate-800">{result[field] || <span className="text-slate-300">未辨識</span>}</dd></div>)}
                </dl>
                <Button size="lg" className="mt-6 w-full bg-blue-600 hover:bg-blue-700" onClick={fillForm}><WandSparkles />填入日產表</Button>
                <p className="mt-2 text-center text-xs text-slate-400">填入後仍可修改所有欄位，再依原流程儲存。</p>
              </>}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
