import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();

test("Static Assets & Experience Logos Integrity", async (t) => {
  await t.test("OnekByte Labs logo exists and is valid", () => {
    const p = path.join(ROOT_DIR, "public/images/experience/onekbyte-logo.png");
    assert.ok(fs.existsSync(p), "onekbyte-logo.png should exist in public/images/experience");
    const stat = fs.statSync(p);
    assert.ok(stat.size > 5000, `onekbyte-logo.png size should be > 5KB, got ${stat.size}`);
  });

  await t.test("Optimus logo exists and is valid", () => {
    const p = path.join(ROOT_DIR, "public/images/experience/optimus-logo.png");
    assert.ok(fs.existsSync(p), "optimus-logo.png should exist in public/images/experience");
    const stat = fs.statSync(p);
    assert.ok(stat.size > 5000, `optimus-logo.png size should be > 5KB, got ${stat.size}`);
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
    "src/components/ExperienceScroll.tsx",
    "src/components/ProjectsGrid.tsx",
    "src/components/HeroScroll.tsx",
    "src/components/StatsSection.tsx",
    "src/components/ContactSection.tsx",
    "src/components/TechStack.tsx"
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
