// joke-pm-cat-joke-entry: one-line cat joke for make.fun
// Competition: u-aldy998-the-one-line-cat-joke-that-lands-a7b18262
// The program writes the joke to /output/entry.txt, exactly as the
// judge will read it. Deterministic: same bytes every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const joke =
  "I call my cat; she hears the can from three rooms away, but not me from three feet.";

// Gate from the kit rules: UTF-8 text of 1 to 200 characters, not only
// white space, one line. Validate before writing so a bad constant
// fails loudly here instead of shipping an invalid entry.
if (joke.length < 1 || joke.length > 200) {
  throw new Error(`joke is ${joke.length} characters, must be 1-200`);
}
if (joke.trim().length === 0) {
  throw new Error("joke must contain a non-whitespace character");
}
if (joke.includes("\n")) {
  throw new Error("joke must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.txt");
// Write exactly the joke bytes, no trailing newline: the judge reads
// the file as-is, and a line end would count as a character.
writeFileSync(dst, joke, "utf8");
// Integrity check: the file on disk must be the joke, byte for byte.
if (readFileSync(dst, "utf8") !== joke) {
  throw new Error("entry.txt does not match the joke");
}
