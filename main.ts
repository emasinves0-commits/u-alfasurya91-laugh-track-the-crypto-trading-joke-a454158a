import { mkdirSync, writeFileSync } from "node:fs";

// Cold storage was supposed to buy peace of mind — it bought compulsive
// chart-checking instead. The punchline is a double meaning: the Ledger
// holds the coins in custody, and the anxiety holds the trader.
const ENTRY_LINE =
  "I moved my Bitcoin to a Ledger for cold storage; now I check the price 30 times a day — the coins can't leave, but my anxiety has full custody.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = "entry.txt";

// The gate accepts 1 to 200 characters of UTF-8 text, and the tie-break
// favours the smaller text: refuse anything but the exact line, measured
// in bytes, rather than submit an entry the gate would reject.
const MAX_ENTRY_CHARS = 200;
function checkedLine(line: string): string {
  const trimmed = line.trim();
  const bytes = Buffer.byteLength(trimmed, "utf8");
  if (bytes < 1 || bytes > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry line is ${bytes} bytes, outside the 1-${MAX_ENTRY_CHARS} gate`,
    );
  }
  return trimmed;
}
const ENTRY_TEXT = checkedLine(ENTRY_LINE);

// The joke is the custody double meaning: it must carry both "cold
// storage" (the setup) and "full custody" (the punchline), or it is not
// this joke at all.
if (!ENTRY_TEXT.includes("cold storage") || !ENTRY_TEXT.includes("full custody")) {
  throw new Error("entry line is missing its setup or its punchline");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
// Write the line exactly, no trailing newline: the file stays at the
// line's own byte count, and the tie-break favours the smaller text.
writeFileSync(`${OUTPUT_DIR}/${OUTPUT_FILE}`, ENTRY_TEXT);
