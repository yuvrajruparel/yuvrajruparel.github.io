import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { F1Modals } from "@/components/portfolio/F1Modals";
import { FallbackImage } from "@/components/portfolio/FallbackImage";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import {
  about,
  asset,
  awards,
  closing,
  contacts,
  experience,
  projects,
  sectionIds,
  skills,
  upcoming,
  type ContactItem,
} from "@/data/portfolio";

const TITLE = "Yuvraj Ruparel | Portfolio";
const DESCRIPTION =
  "Mechanical Engineering student at Duke University interested in robotics, mechatronics and hardware.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const contactIcons: Record<ContactItem["icon"], LucideIcon> = {
  mail: Mail,
  linkedin: Linkedin,
  file: FileText,
  github: Github,
};

function Home() {
  const { active, jumpTo } = useScrollSpy(sectionIds);
  const [modal, setModal] = useState<"f1-photos" | "f1-docs" | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar active={active} onNavigate={jumpTo} />

      <main className="ml-[300px] pl-14 pr-10">
        <div className="max-w-[900px] pb-24 pt-14">
          {/* Name + About */}
          <section id="home">
            <h1 className="font-display text-[64px] font-extrabold uppercase leading-[1.05] tracking-[0.01em]">Yuvraj Ruparel</h1>
            <div className="mt-8 space-y-5 text-[18px] leading-[1.6] text-foreground">
              {about.map((paragraph, i) => (
                <p key={i} className="text-justify-body">
                  {paragraph.map((part, j) =>
                    part.viewKey ? (
                      <Link key={j} to="/view/$key" params={{ key: part.viewKey }} className="inline-link">
                        {part.text}
                      </Link>
                    ) : (
                      <span key={j}>{part.text}</span>
                    ),
                  )}
                </p>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-6">
              {contacts.map((c) => {
                const Icon = contactIcons[c.icon];
                const inner = (
                  <>
                    <Icon size={28} strokeWidth={1.75} className="shrink-0 text-muted-foreground" />
                    <span className="text-link">{c.label}</span>
                  </>
                );
                const cls = "flex items-center gap-2.5 text-[16px] font-medium";
                return c.viewKey ? (
                  <Link key={c.label} to="/view/$key" params={{ key: c.viewKey }} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <a
                    key={c.label}
                    href={c.href}
                    className={cls}
                    {...(c.href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {inner}
                  </a>
                );
              })}
            </div>
          </section>

          {/* Technical Projects */}
          <section id="projects" className="mt-[72px]">
            <h2 className="section-heading">Technical Projects</h2>
            <div className="mt-6 grid grid-cols-3 gap-5">
              {projects.map((p) => (
                <ProjectCard key={p.title} project={p} onOpenModal={setModal} />
              ))}
            </div>
          </section>

          {/* Upcoming */}
          <section id="upcoming" className="mt-[72px]">
            <h2 className="section-heading">Upcoming</h2>
            <div className="mt-6 flex flex-col gap-5">
              {upcoming.map((u) => (
                <article key={u.title} className="rounded-[12px] border border-border bg-card p-4">
                  <h3 className="text-[16px] font-bold leading-snug">{u.title}</h3>
                  <p className="mt-2 text-justify-body text-[14px] leading-[1.55] text-foreground/85">{u.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Professional Experience */}
          <section id="experience" className="mt-[72px]">
            <h2 className="section-heading">Professional Experience</h2>
            <div className="mt-6 space-y-4">
              {experience.map((x) => (
                <div key={x.title} className="tint-box p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[10px] border border-tint-border bg-background">
                      <FallbackImage
                        src={asset(x.logo)}
                        alt={`${x.org} logo`}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-[17px] font-bold leading-snug">{x.title}</h3>
                          <p className="text-[15px] text-muted-foreground">{x.org}</p>
                        </div>
                        <span className="whitespace-nowrap text-[14px] text-muted-foreground">{x.date}</span>
                      </div>
                      <div className="mt-3 text-justify-body text-[15px] leading-relaxed text-foreground/85">
                        {x.bullets && (
                          <ul className="list-disc space-y-1 pl-5">
                            {x.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        )}
                        {x.intro && <p>{x.intro}</p>}
                        {x.numbered && (
                          <ol className="mt-1.5 list-decimal space-y-1 pl-5">
                            {x.numbered.map((n) => (
                              <li key={n.name}>
                                <span className="font-semibold text-foreground">{n.name}:</span> {n.explanation}
                              </li>
                            ))}
                          </ol>
                        )}
                        {x.text && <p>{x.text}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Awards */}
          <section id="awards" className="mt-[72px]">
            <h2 className="section-heading">Awards</h2>
            <div className="mt-3 h-px w-full bg-border" />
            <ul className="mt-4 space-y-3.5">
              {awards.map((a) => (
                <li key={`${a.name}-${a.date}`} className="flex items-baseline gap-3">
                  <span className="chip shrink-0 whitespace-nowrap">{a.name}</span>
                  <span className="min-w-0 flex-1 text-justify-body text-[15px] font-semibold leading-snug">{a.description}</span>
                  <span className="shrink-0 pl-4 text-[14px] text-subtle">{a.date}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Skills */}
          <section id="skills" className="mt-[72px]">
            <h2 className="section-heading">Skills</h2>
            <div className="mt-6 grid grid-cols-3 gap-6">
              {skills.map((s) => (
                <div key={s.title} className="skill-card flex h-full flex-col p-5">
                  <h3 className="font-display text-[30px] font-bold uppercase leading-[1.05] tracking-[0.01em]">
                    {s.title}
                  </h3>
                  <div className="mt-4 border-t border-dashed border-subtle" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((item, j) => (
                      <span key={item} className={j === 0 ? "skill-tag bg-skill-highlight" : "skill-tag bg-background"}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Closing banner */}
          <section id="summer-2027" className="mt-[72px] border-t border-border py-20">
            <h2 className="font-display text-[40px] font-bold uppercase leading-[1.05] tracking-[0.01em]">{closing.headline}</h2>
            <p className="mt-3 text-justify-body text-[18px] text-muted-foreground">{closing.subtext}</p>
          </section>
        </div>
      </main>

      <F1Modals open={modal} onClose={() => setModal(null)} />
    </div>
  );
}
