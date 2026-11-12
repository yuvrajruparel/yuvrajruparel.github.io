import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { asset, type Project } from "@/data/portfolio";
import { FallbackImage } from "./FallbackImage";

const chipClass = "chip whitespace-nowrap transition-colors duration-150 hover:bg-pill";

type Props = { project: Project; onOpenModal: (modal: "f1-photos" | "f1-docs") => void };

export function ProjectCard({ project, onOpenModal }: Props) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[12px] border border-border bg-card">
      <div className="aspect-[16/10] w-full border-b border-border bg-placeholder">
        <FallbackImage
          src={asset(project.image)}
          alt={project.title}
          loading="lazy"
          className={cn("h-full w-full", project.fit === "cover" ? "object-cover" : "object-contain")}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <h3 className="text-[16px] font-bold leading-snug">{project.title}</h3>
          <span className="whitespace-nowrap text-[13px] text-muted-foreground">{project.date}</span>
        </div>
        <p className="mt-2 text-justify-body text-[14px] leading-[1.55] text-foreground/85">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.links.map((link) => {
            if (link.kind === "view") {
              return (
                <Link key={link.label} to="/view/$key" params={{ key: link.viewKey }} className={chipClass}>
                  {link.label}
                  <ArrowUpRight size={14} className="text-muted-foreground" />
                </Link>
              );
            }
            if (link.kind === "external") {
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={chipClass}>
                  {link.label}
                  <ExternalLink size={13} className="text-muted-foreground" />
                </a>
              );
            }
            return (
              <button key={link.label} type="button" onClick={() => onOpenModal(link.modal)} className={chipClass}>
                {link.label}
                <ArrowUpRight size={14} className="text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}
