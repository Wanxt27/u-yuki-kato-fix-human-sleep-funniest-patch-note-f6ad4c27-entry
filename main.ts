import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

// One line of patch notes: human sleep, fixed at last. The joke treats sleep
// as software — it crashes at 3 a.m. because a "just one more video"
// background process is still running, so the fix terminates that process.
const NOTE =
  "Fixed: human sleep no longer crashes at 3 a.m. — the 'just one more video' process has been terminated.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

mkdirSync(OUT_DIR, { recursive: true });
if (existsSync(OUT_FILE)) rmSync(OUT_FILE);
writeFileSync(OUT_FILE, NOTE, "utf8");
console.log(NOTE);
