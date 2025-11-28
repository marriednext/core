import { readdir, mkdir, writeFile, watch } from "node:fs/promises";
import { join } from "node:path";
import { parseProperties } from "./parser.js";

const DEFAULTS_DIR = join(process.cwd(), "src", "defaults");
const DIST_DIR = join(process.cwd(), "dist");

async function ensureDistDir() {
  try {
    await mkdir(DIST_DIR, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
}

async function findThemes(): Promise<string[]> {
  const entries = await readdir(DEFAULTS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

async function buildTheme(themeName: string): Promise<void> {
  const propertiesPath = join(DEFAULTS_DIR, themeName, "default.properties");
  const labels = parseProperties(propertiesPath);
  const outputPath = join(DIST_DIR, `${themeName}.json`);
  await writeFile(outputPath, JSON.stringify(labels, null, 2) + "\n", "utf8");
  console.log(`Built ${themeName}.json`);
}

async function buildAll(): Promise<void> {
  await ensureDistDir();
  const themes = await findThemes();
  await Promise.all(themes.map((theme) => buildTheme(theme)));
}

async function watchFiles(): Promise<void> {
  console.log("Watching for changes...");
  const watcher = watch(DEFAULTS_DIR, { recursive: true });
  let buildTimeout: NodeJS.Timeout | null = null;

  for await (const event of watcher) {
    if (event.filename && event.filename.endsWith(".properties")) {
      if (buildTimeout) {
        clearTimeout(buildTimeout);
      }
      buildTimeout = setTimeout(async () => {
        console.log(`Change detected in ${event.filename}`);
        await buildAll();
      }, 100);
    }
  }
}

async function main() {
  const isWatch = process.argv.includes("--watch");

  await buildAll();

  if (isWatch) {
    await watchFiles();
  }
}

main().catch((error) => {
  console.error("Build failed:", error);
  process.exit(1);
});
