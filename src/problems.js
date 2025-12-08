// src/problems.js
import fs from "fs/promises";
import path from "path";

/**
 * Load all problems from final450.json
 * Returns: array of problem objects (Sheet1)
 */
export async function loadProblems() {
  // Use project root as base (where you run `node`)
  const FINAL450_PATH = path.resolve(process.cwd(), "final450.json");

  const raw = await fs.readFile(FINAL450_PATH, "utf-8");
  const cleaned = raw.replace(/^\uFEFF/, "").trim(); // strip BOM if present

  const data = JSON.parse(cleaned);

  if (!data.Sheet1 || !Array.isArray(data.Sheet1)) {
    throw new Error("Invalid JSON: expected data.Sheet1 to be an array");
  }

  return data.Sheet1;
}
