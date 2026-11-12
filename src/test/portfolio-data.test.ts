import { describe, expect, it } from "vitest";
import { documents, projects, awards } from "@/data/portfolio";

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
});
