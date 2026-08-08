import { emptyOcrResult, ocrFieldNames, type OcrResult } from "@/lib/ocr"

export const runtime = "nodejs"

const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])

const prompt = `You are an OCR engine.

Read this Daily Production Report.

Extract every field.

Return ONLY valid JSON.

Do not explain anything.

If a field is missing, return an empty string.`

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status })
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return errorResponse("伺服器尚未設定 OpenAI API 金鑰。", 500)

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return errorResponse("無法讀取上傳內容。", 400)
  }

  const image = formData.get("image")
  if (!(image instanceof File)) return errorResponse("請上傳日產表圖片。", 400)
  if (!ACCEPTED_IMAGE_TYPES.has(image.type)) return errorResponse("僅支援 JPG、PNG 或 WebP 圖片。", 415)
  if (image.size === 0 || image.size > MAX_IMAGE_SIZE) return errorResponse("圖片大小必須介於 1 byte 與 10 MB 之間。", 413)

  const imageData = Buffer.from(await image.arrayBuffer()).toString("base64")
  const imageUrl = `data:${image.type};base64,${imageData}`
  const properties = Object.fromEntries(
    ocrFieldNames.map((field) => [field, { type: "string" }])
  )

  try {
    const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_OCR_MODEL || "gpt-4.1-mini",
        input: [{
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            { type: "input_image", image_url: imageUrl, detail: "high" },
          ],
        }],
        text: {
          format: {
            type: "json_schema",
            name: "daily_production_report",
            strict: true,
            schema: {
              type: "object",
              properties,
              required: [...ocrFieldNames],
              additionalProperties: false,
            },
          },
        },
      }),
    })

    const payload = await openAiResponse.json() as {
      error?: { message?: string }
      output_text?: string
      output?: Array<{ content?: Array<{ type?: string; text?: string }> }>
    }

    if (!openAiResponse.ok) {
      console.error("OpenAI OCR request failed:", payload.error?.message ?? openAiResponse.statusText)
      return errorResponse("AI 辨識服務目前無法使用，請稍後再試。", 502)
    }

    const outputText = payload.output_text ?? payload.output
      ?.flatMap((item) => item.content ?? [])
      .find((content) => content.type === "output_text")?.text

    if (!outputText) return errorResponse("AI 未回傳可辨識的內容。", 502)

    const parsed = JSON.parse(outputText) as Partial<OcrResult>
    const result = Object.fromEntries(
      ocrFieldNames.map((field) => [field, typeof parsed[field] === "string" ? parsed[field] : ""])
    ) as OcrResult

    return Response.json({ ...emptyOcrResult, ...result })
  } catch (error) {
    console.error("OCR processing failed:", error)
    return errorResponse("辨識圖片時發生錯誤，請稍後再試。", 500)
  }
}
