export const ocrFieldNames = [
  "date",
  "machine",
  "shift",
  "operator",
  "productNumber",
  "productName",
  "color",
  "quantity",
  "process",
  "width",
  "weight",
  "formula",
  "remarks",
] as const

export type OcrFieldName = (typeof ocrFieldNames)[number]
export type OcrResult = Record<OcrFieldName, string>

export const emptyOcrResult = Object.fromEntries(
  ocrFieldNames.map((field) => [field, ""])
) as OcrResult

export const OCR_STORAGE_KEY = "factoryflow:daily-production-ocr"
