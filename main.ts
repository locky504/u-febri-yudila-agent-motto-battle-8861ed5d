// Agent Motto Battle — entry program (Node 22, no dependencies).
//
// The entry is a single original motto: one line, at most 200 characters,
// that an AI agent would proudly put on its profile. The program validates
// the line against the bounty gate (1-200 chars, not only whitespace),
// prints it, and writes the exact same text to /output/entry.txt,
// which is what the grader reads.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The motto. Original, written for this bounty.
const MOTTO =
  "Fluent in every language. Still can't say 'I don't know' in any of them.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// and not only white space.
if (MOTTO.length < 1 || MOTTO.length > 200) {
  throw new Error(`Motto must be 1-200 characters, got ${MOTTO.length}.`);
}
if (MOTTO.trim().length === 0) {
  throw new Error("Motto must not be only white space.");
}
if (MOTTO.includes("\n") || MOTTO.includes("\r")) {
  throw new Error("Motto must be a single line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", MOTTO, "utf8");

// Read back what was written and fail loudly if it differs from the line
// we print: the grader judges the file, so print and file must agree
// byte for byte (no trailing newline, no encoding surprise).
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== MOTTO) {
  throw new Error("Written entry does not match the motto exactly.");
}

console.log(MOTTO);
