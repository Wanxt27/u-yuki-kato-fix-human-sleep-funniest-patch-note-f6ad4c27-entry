import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

// One line of patch notes: human sleep, fixed at last. The joke treats sleep
// as software — it crashes at 3 a.m. because a "just one more video"
// background process is still running, so the fix terminates that process.
const NOTE =
  "Fixed: human sleep no longer crashes at 3 a.m. — the 'just one more video' process has been terminated.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// The gate only accepts 1 to 160 characters: refuse to write anything
// outside that range instead of submitting an invalid line.
if (NOTE.length < 1 || NOTE.length > 160 || NOTE.trim().length === 0) {
  console.error(`patch note is ${NOTE.length} characters, outside the 1-160 gate`);
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
if (existsSync(OUT_FILE)) rmSync(OUT_FILE);
writeFileSync(OUT_FILE, NOTE, "utf8");

// Read back what landed on disk: the graded artifact must be byte-identical
// to the line above, so fail loudly here rather than ship a wrong file.
if (readFileSync(OUT_FILE, "utf8") !== NOTE) {
  console.error("entry.txt on disk does not match the patch note");
  process.exit(1);
}
console.log(NOTE);
