import { describe, expect, it } from "vitest";
import { about, documents, experience, projects, awards, skills, upcoming } from "@/data/portfolio";

describe("Portfolio content rules", () => {
  it("has exactly 6 project cards in the requested order", () => {
    expect(projects.map((p) => p.title)).toEqual([
      "Spiderbot Mark I",
      "Sensor PCB for Duke Robotics Club",
      "Humidifier and Dehumidifier for the Duke Phytotron",
      "ISS De-orbit Simulator",
      "Automated Waste Segregation System",
      "Aramco F1 in Schools",
    ]);
  });

  it("opens the Phytotron poster and 17x17x17 photo as images, the resume as a PDF", () => {
    expect(documents["phytotron-poster"]).toMatchObject({ file: "docs/phytotron-poster.png", type: "image" });
    expect(documents["cube-17x17x17"]).toMatchObject({ file: "photos/cube-17x17x17.jpg", type: "image" });
    expect(documents["resume"]).toMatchObject({ file: "docs/resume.pdf", type: "pdf" });
  });

  it("every in-site viewer link points at a known document", () => {
    const keys = projects.flatMap((p) => p.links.flatMap((l) => (l.kind === "view" ? [l.viewKey] : [])));
    for (const k of keys) expect(documents[k], k).toBeDefined();
  });

  it("never links project files to github.com file pages", () => {
    for (const d of Object.values(documents)) expect(d.file).not.toMatch(/github/);
  });

  it("lists awards newest first", () => {
    expect(awards[0]?.date).toBe("12/2024");
    expect(awards.at(-1)?.date).toBe("08/2021");
  });

  it("uses the updated project and experience dates", () => {
    const date = (t: string) => projects.find((p) => p.title === t)?.date;
    expect(date("ISS De-orbit Simulator")).toBe("09/2025 - 12/2025");
    expect(date("Sensor PCB for Duke Robotics Club")).toBe("02/2026 - Present");
    expect(experience.find((x) => x.org === "Duke Robotics Club")?.date).toBe("02/2026 - Present");
  });

  it("mentions only Crush, not Oogway", () => {
    const all = JSON.stringify({ projects, experience, upcoming });
    expect(all).toContain("Crush");
    expect(all).not.toContain("Oogway");
  });

  it("labels the waste paper link as Published research paper with the same URL", () => {
    const links = projects.find((p) => p.title === "Automated Waste Segregation System")?.links ?? [];
    expect(links).toContainEqual({
      kind: "external",
      label: "Published research paper",
      href: "https://pubs.sciepub.com/wjee/9/1/1/index.html#RNfigures",
    });
  });

  it("shows a skill count that matches the number of tags in each card", () => {
    expect(skills.map((s) => s.count.toUpperCase())).toEqual([
      "6 TOOLS", "3 TOOLS", "6 TOOLS", "4 SKILLS", "2 ROLES", "6 LANGUAGES",
    ]);
    for (const s of skills) expect(Number(s.count.split(" ")[0]), s.title).toBe(s.items.length);
  });

  it("keeps the two interest paragraphs no longer than the two academic ones", () => {
    const len = (p: { text: string }[]) => p.map((x) => x.text).join("").length;
    expect(about).toHaveLength(4);
    expect(len(about[2]!) + len(about[3]!)).toBeLessThanOrEqual(len(about[0]!) + len(about[1]!));
  });
});
