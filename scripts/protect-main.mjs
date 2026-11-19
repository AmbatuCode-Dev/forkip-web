import { execFileSync } from "node:child_process";
import process from "node:process";

function getCurrentBranch() {
  try {
    return execFileSync("git", ["symbolic-ref", "--short", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

async function readStdin() {
  if (process.stdin.isTTY) {
    return "";
  }

  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function targetsMainBranch(stdinText) {
  return stdinText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .some((line) => {
      const parts = line.split(/\s+/);
      return parts[2] === "refs/heads/main";
    });
}

const mode = process.argv[2];
const branch = getCurrentBranch();

if (mode === "commit") {
  if (branch === "main") {
    console.error(
      "Direct commits to 'main' are blocked. Create a feature branch first.",
    );
    process.exit(1);
  }
} else if (mode === "push") {
  const stdinText = await readStdin();
  if (branch === "main" || targetsMainBranch(stdinText)) {
    console.error(
      "Direct pushes to 'main' are blocked. Open a pull request instead.",
    );
    process.exit(1);
  }
} else {
  console.error("Usage: node scripts/protect-main.mjs <commit|push>");
  process.exit(1);
}
