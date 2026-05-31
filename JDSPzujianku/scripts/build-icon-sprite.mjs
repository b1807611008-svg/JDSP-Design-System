#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const iconsDir = path.join(workspaceRoot, "src", "assets", "icons");
const outFile = path.join(iconsDir, "sprite.svg");

function stripXmlEnvelope(svg) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!doctype[\s\S]*?>/gi, "")
    .trim();
}

function extractViewBox(svg) {
  const match = svg.match(/viewBox="([^"]+)"/i);
  if (match) return match[1];
  const widthMatch = svg.match(/width="([^"]+)"/i);
  const heightMatch = svg.match(/height="([^"]+)"/i);
  const width = widthMatch ? parseFloat(widthMatch[1]) : 24;
  const height = heightMatch ? parseFloat(heightMatch[1]) : 24;
  return `0 0 ${Number.isFinite(width) ? width : 24} ${Number.isFinite(height) ? height : 24}`;
}

function extractInnerSvg(svg) {
  const start = svg.indexOf(">");
  const end = svg.lastIndexOf("</svg>");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Invalid SVG: missing root <svg> wrapper.");
  }
  return svg.slice(start + 1, end).trim();
}

function toSymbolId(fileName) {
  return fileName.replace(/\.svg$/i, "");
}

async function buildSprite() {
  const entries = await fs.readdir(iconsDir, { withFileTypes: true });
  const svgFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.toLowerCase().endsWith(".svg"))
    .filter((name) => name !== "sprite.svg")
    .sort((a, b) => a.localeCompare(b));

  if (svgFiles.length === 0) {
    throw new Error(`No source SVG files found in ${iconsDir}`);
  }

  const symbols = [];
  for (const fileName of svgFiles) {
    const absPath = path.join(iconsDir, fileName);
    const raw = await fs.readFile(absPath, "utf8");
    const cleaned = stripXmlEnvelope(raw);
    const viewBox = extractViewBox(cleaned);
    const inner = extractInnerSvg(cleaned);
    const symbolId = toSymbolId(fileName);
    symbols.push(`<symbol id="${symbolId}" viewBox="${viewBox}">${inner}</symbol>`);
  }

  const spriteContent = [
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">',
    ...symbols,
    "</svg>",
    "",
  ].join("\n");

  await fs.writeFile(outFile, spriteContent, "utf8");
  process.stdout.write(`Built icon sprite: ${outFile}\n`);
  process.stdout.write(`Included ${svgFiles.length} icons.\n`);
}

buildSprite().catch((error) => {
  process.stderr.write(`build-icon-sprite failed: ${error.message}\n`);
  process.exitCode = 1;
});
