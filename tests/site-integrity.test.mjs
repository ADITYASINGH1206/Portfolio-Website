import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();

test("Static Assets & Experience Logos Integrity", async (t) => {
  await t.test("OnekByte Labs SVG and PNG logos exist and are valid", () => {
    const svg = path.join(ROOT_DIR, "public/images/experience/onekbyte.svg");
    assert.ok(fs.existsSync(svg), "onekbyte.svg should exist in public/images/experience");
    assert.ok(fs.statSync(svg).size > 1000, "onekbyte.svg should be valid non-empty file");
  });

  await t.test("Optimus SVG and PNG logos exist and are valid", () => {
    const svg = path.join(ROOT_DIR, "public/images/experience/optimus.svg");
    assert.ok(fs.existsSync(svg), "optimus.svg should exist in public/images/experience");
    assert.ok(fs.statSync(svg).size > 1000, "optimus.svg should be valid non-empty file");
  });

  await t.test("Freelance Platform SVGs (Upwork & Fiverr) exist and are valid", () => {
    const upwork = path.join(ROOT_DIR, "public/images/experience/upwork.svg");
    const fiverr = path.join(ROOT_DIR, "public/images/experience/fiverr.svg");
    assert.ok(fs.existsSync(upwork), "upwork.svg should exist");
    assert.ok(fs.existsSync(fiverr), "fiverr.svg should exist");
    assert.ok(fs.statSync(upwork).size > 100, "upwork.svg should be non-empty");
    assert.ok(fs.statSync(fiverr).size > 100, "fiverr.svg should be non-empty");
  });

  await t.test("Resume file exists", () => {
    const p = path.join(ROOT_DIR, "public/resume.pdf");
    assert.ok(fs.existsSync(p), "resume.pdf should exist in public directory");
    const stat = fs.statSync(p);
    assert.ok(stat.size > 1000, `resume.pdf should be non-empty, got ${stat.size}`);
  });
});

test("Projects Data Integrity", async () => {
  const projectsFilePath = path.join(ROOT_DIR, "src/data/projects.ts");
  assert.ok(fs.existsSync(projectsFilePath), "src/data/projects.ts must exist");

  const content = fs.readFileSync(projectsFilePath, "utf8");
  assert.ok(content.includes("export const projects"), "projects data array must be exported");

  // Verify all local image references in projects exist in public/
  const imageRegex = /image:\s*["']([^"']+)["']/g;
  let match;
  let count = 0;
  while ((match = imageRegex.exec(content)) !== null) {
    count++;
    const imagePath = match[1];
    if (imagePath.startsWith("/")) {
      const fullPath = path.join(ROOT_DIR, "public", imagePath);
      assert.ok(
        fs.existsSync(fullPath),
        `Referenced project image "${imagePath}" must exist in public directory`
      );
    }
  }
  assert.ok(count > 0, "Should have verified project images");
});

test("Core Application Routes & Components", async (t) => {
  const requiredFiles = [
    "src/app/page.tsx",
    "src/app/projects/page.tsx",
    "src/app/api/leetcode/route.ts",
    "src/components/ExperienceScroll.tsx",
    "src/components/ProjectsGrid.tsx",
    "src/components/HeroScroll.tsx",
    "src/components/StatsSection.tsx",
    "src/components/ContactSection.tsx",
    "src/components/TechStack.tsx",
    "src/components/SocialSidebar.tsx",
    "src/components/BentoGrid.tsx"
  ];

  for (const file of requiredFiles) {
    await t.test(`Component ${file} exists and is non-empty`, () => {
      const fullPath = path.join(ROOT_DIR, file);
      assert.ok(fs.existsSync(fullPath), `${file} should exist`);
      const stat = fs.statSync(fullPath);
      assert.ok(stat.size > 100, `${file} should not be empty`);
    });
  }
});

test("LeetCode Integration & Profile Links Integrity", async (t) => {
  const profileUrl = "https://leetcode.com/u/adityasingh1206/";

  await t.test("API route handler exports GET and includes profile URL", () => {
    const routePath = path.join(ROOT_DIR, "src/app/api/leetcode/route.ts");
    assert.ok(fs.existsSync(routePath), "LeetCode route handler must exist");
    const content = fs.readFileSync(routePath, "utf8");
    assert.ok(content.includes("export async function GET"), "Route handler must export GET function");
    assert.ok(content.includes(profileUrl), "Route handler must reference profile URL");
    assert.ok(content.includes("totalSolved"), "Route handler must return totalSolved");
    assert.ok(content.includes("rating"), "Route handler must return rating");
  });

  await t.test("StatsSection includes clickable LeetCode profile link and calls API", () => {
    const statsPath = path.join(ROOT_DIR, "src/components/StatsSection.tsx");
    const content = fs.readFileSync(statsPath, "utf8");
    assert.ok(content.includes(profileUrl), "StatsSection must link to LeetCode profile URL");
    assert.ok(content.includes('fetch("/api/leetcode")'), "StatsSection must call /api/leetcode endpoint");
    assert.ok(content.includes('target="_blank"'), "LeetCode links must open in a new tab");
  });

  await t.test("SocialSidebar includes LeetCode profile link", () => {
    const socialPath = path.join(ROOT_DIR, "src/components/SocialSidebar.tsx");
    const content = fs.readFileSync(socialPath, "utf8");
    assert.ok(content.includes(profileUrl), "SocialSidebar must link to LeetCode profile URL");
    assert.ok(content.includes("SiLeetcode"), "SocialSidebar must render LeetCode icon");
  });

  await t.test("BentoGrid includes LeetCode profile link", () => {
    const bentoPath = path.join(ROOT_DIR, "src/components/BentoGrid.tsx");
    const content = fs.readFileSync(bentoPath, "utf8");
    assert.ok(content.includes(profileUrl), "BentoGrid must link to LeetCode profile URL");
  });
});
