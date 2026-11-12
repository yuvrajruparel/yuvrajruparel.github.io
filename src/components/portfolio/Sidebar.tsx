import { useLayoutEffect, useRef, useState } from "react";
import { Briefcase, CalendarDays, Cpu, House, Layers, Trophy, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { asset, profile, type SectionId } from "@/data/portfolio";
import { FallbackImage } from "./FallbackImage";

type NavItem = { id: SectionId; label: string; icon?: LucideIcon; sub?: boolean; parentOf?: SectionId[] };

const nav: NavItem[] = [
  { id: "home", label: "Home", icon: House },
  { id: "projects", label: "Technical Projects", icon: Cpu, parentOf: ["projects", "upcoming"] },
  { id: "projects", label: "Current", sub: true },
  { id: "upcoming", label: "Upcoming", sub: true },
  { id: "experience", label: "Professional Experience", icon: Briefcase },
  { id: "awards", label: "Awards", icon: Trophy },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "summer-2027", label: "Summer 2027", icon: CalendarDays },
];

type Props = { active: SectionId; onNavigate: (id: SectionId) => void };

export function Sidebar({ active, onNavigate }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ top: number; height: number } | null>(null);

  // Projects and Upcoming sections put the pill on their sub-item, not the parent.
  const activeIndex = nav.findIndex((item) => item.id === active && !item.parentOf);

  useLayoutEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) setPill({ top: el.offsetTop, height: el.offsetHeight });
  }, [activeIndex]);

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[300px] flex-col overflow-y-auto border-r border-border bg-background px-7 py-10">
      <FallbackImage
        src={asset(profile.headshot)}
        alt={profile.name}
        width={140}
        height={140}
        className="h-[140px] w-[140px] rounded-[12px] object-cover"
      />
      <h2 className="mt-4 text-[20px] font-bold leading-tight">{profile.name}</h2>
      <div className="mt-1.5 space-y-0.5 text-[15px] leading-snug text-muted-foreground">
        {profile.bioLines.map((line) => (
          <p key={line} className="whitespace-nowrap">
            {line}
          </p>
        ))}
      </div>

      <nav className="mt-7" aria-label="Sections">
        <ul ref={listRef} className="relative space-y-0.5">
          {pill && (
            <span
              aria-hidden
              className="absolute inset-x-0 rounded-[10px] bg-pill transition-[top,height] duration-150 ease-out"
              style={{ top: pill.top, height: pill.height }}
            />
          )}
          {nav.map((item, i) => {
            const isActive = i === activeIndex;
            const groupActive = item.parentOf?.includes(active);
            const Icon = item.icon;
            return (
              <li key={`${item.id}-${item.label}`}>
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative flex w-full items-center gap-3 whitespace-nowrap rounded-[10px] px-3 text-left transition-colors duration-150",
                    item.sub ? "py-1.5 pl-[42px] text-[14px]" : "py-2 text-[15px]",
                    isActive || groupActive
                      ? "font-semibold text-foreground"
                      : "font-medium text-muted-foreground hover:text-foreground",
                  )}
                >
                  {Icon && <Icon size={18} strokeWidth={1.75} className="shrink-0" />}
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
