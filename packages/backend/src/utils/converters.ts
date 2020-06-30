import { Parser } from "json2csv";

export function exportToCsv(obj: any) {
  const parser = new Parser({
    delimiter: ";",
    excelStrings: false,
  });
  return parser.parse(obj);
}

export function exportToJson(obj: any) {
  return JSON.stringify(obj, null, 2);
}

export function exportObject(obj: any, format: "json" | "csv" = "json") {
  return format === "json" ? exportToJson(obj) : exportToCsv(obj);
}
