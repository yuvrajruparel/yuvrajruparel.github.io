import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Briefcase, CalendarDays, Cpu, House, Layers, Menu, Trophy, X, type LucideIcon } from "lucide-react";
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
  // Phone/tablet only: the sidebar slides in over the page from the menu button.
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Projects and Upcoming sections put the pill on their sub-item, not the parent.
  const activeIndex = nav.findIndex((item) => item.id === active && !item.parentOf);

  useLayoutEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) setPill({ top: el.offsetTop, height: el.offsetHeight });
  }, [activeIndex]);

  // While open: lock page scroll (released synchronously on close so a nav jump can scroll).
  useLayoutEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // While open: Escape closes; widening to laptop size closes.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const navigate = (id: SectionId) => {
    flushSync(() => setOpen(false));
    onNavigate(id);
  };

  return (
    <>
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open menu"
      aria-expanded={open}
      className="fixed left-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-[10px] border border-border bg-background text-foreground lg:hidden"
    >
      <Menu size={22} strokeWidth={1.75} />
    </button>
    {open && <div aria-hidden className="fixed inset-0 z-30 bg-backdrop lg:hidden" onClick={() => setOpen(false)} />}
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-[min(300px,85vw)] flex-col overflow-y-auto border-r border-border bg-background px-7 py-10 transition-[translate,visibility] duration-200 ease-out lg:z-20 lg:w-[300px] lg:translate-x-0 lg:transition-none",
        open ? "translate-x-0" : "-translate-x-full max-lg:invisible",
      )}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close menu"
        className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-[10px] text-muted-foreground lg:hidden"
      >
        <X size={22} strokeWidth={1.75} />
      </button>
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
                  onClick={() => navigate(item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative flex w-full items-center gap-3 whitespace-nowrap rounded-[10px] px-3 text-left transition-colors duration-150",
                    item.sub ? "py-1.5 pl-[42px] text-[14px]" : "py-2 text-[15px]",
                    "max-lg:min-h-11",
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
    </>
  );
}
