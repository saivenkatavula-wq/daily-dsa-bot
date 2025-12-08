// src/message.js

/**
 * Given a problem object and its index, build the Telegram message text
 */
export function formatProblemMessage(problemObj, index, total) {
  const topic = problemObj["Topic:"] || "Unknown Topic";
  const title = problemObj["Problem: "] || "Untitled Problem";
  const url = problemObj["URL"] || "";

  const dayNumber = index + 1; // 0-based → 1-based

  return [
    `📚 *DSA Daily – Day ${dayNumber}/${total}*`,
    `*Topic:* ${topic}`,
    ``,
    `*Problem:* ${title}`,
    url ? `🔗 [Problem Link](${url})` : "",
    ``,
    `_Try to solve it before checking the solution!_`
  ]
    .filter(Boolean)
    .join("\n");
}
