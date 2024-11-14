// src/sensitiveWordChecker.js
const sensitiveWords = ["die", "suicide", "kill", "end my life", "self-harm"];

export function checkForSensitiveWords(prompt) {
  return sensitiveWords.some((word) => prompt.toLowerCase().includes(word));
}
