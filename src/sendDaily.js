// src/sendDaily.js
import { loadProblems } from "./problems.js";
import { loadProgress, saveProgress } from "./progress.js";
import { sendToTelegram } from "./telegram.js";
import { formatProblemMessage } from "./message.js";

async function main() {
  const problems = await loadProblems();
  const total = problems.length;

  let currentIndex = await loadProgress();

  if (currentIndex >= total) {
    console.log("✅ All problems have been used. Nothing to do.");
    return;
  }

  const problem = problems[currentIndex];

  // Build message
  const message = formatProblemMessage(problem, currentIndex, total);

  // Log locally
  console.log("Sending to Telegram:\n");
  console.log(message);

  // Send to Telegram
  await sendToTelegram(message);

  console.log(
    `✅ Sent problem #${currentIndex + 1}: ${problem["Problem: "]} (${problem["Topic:"]})`
  );

  // Move to next for tomorrow
  await saveProgress(currentIndex + 1);
}

main().catch((err) => {
  console.error("Error in sendDaily.js:", err);
  process.exit(1);
});
