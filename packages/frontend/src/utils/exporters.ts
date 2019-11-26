import { saveAs } from "file-saver";

export function exportCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv" });
  saveAs(blob, filename);
}
