// src/progress.js
import fs from "fs/promises";
import path from "path";

const PROGRESS_PATH = path.resolve(process.cwd(), "progress.json");

/**
 * Load current index from progress.json
 * If file missing or invalid → 0
 */
export async function loadProgress() {
  try {
    const raw = await fs.readFile(PROGRESS_PATH, "utf-8");
    const data = JSON.parse(raw);
    if (typeof data.currentIndex !== "number") {
      throw new Error("Invalid progress.json structure");
    }
    return data.currentIndex;
  } catch (err) {
    return 0;
  }
}

/**
 * Save current index to progress.json
 */
export async function saveProgress(currentIndex) {
  const data = { currentIndex };
  await fs.writeFile(PROGRESS_PATH, JSON.stringify(data, null, 2), "utf-8");
}
