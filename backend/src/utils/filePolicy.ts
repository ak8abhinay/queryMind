import path from "path";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const DOCUMENT_EXTENSIONS = [".txt", ".md", ".pdf"];
export const CODE_EXTENSIONS = [
  ".js", ".ts", ".jsx", ".tsx", ".py", ".java", ".c", ".cpp", ".h", ".cs",
  ".go", ".rs", ".rb", ".php", ".swift", ".kt", ".sql", ".sh", ".html",
  ".css", ".json", ".yaml", ".yml",
];
export const ALLOWED_EXTENSIONS = [...DOCUMENT_EXTENSIONS, ...CODE_EXTENSIONS];

export const getExtension = (filename: string) =>
  path.extname(filename).toLowerCase();

// Decided server-side, never from the client's declared mimetype
export const mimeTypeFor = (ext: string) =>
  ext === ".pdf" ? "application/pdf" : "text/plain; charset=utf-8";