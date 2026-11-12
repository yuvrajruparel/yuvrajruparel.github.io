import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";
import { asset, f1Awards, f1Docs, f1Photos } from "@/data/portfolio";
import { FallbackImage } from "./FallbackImage";
import { Modal } from "./Modal";

type Props = { open: "f1-photos" | "f1-docs" | null; onClose: () => void };

function DocRow({ label, viewKey }: { label: string; viewKey: string }) {
  return (
    <Link
      to="/view/$key"
      params={{ key: viewKey }}
      className="flex items-center gap-3 rounded-[8px] bg-chip px-3.5 py-2.5 text-[15px] font-medium transition-colors duration-150 hover:bg-pill"
    >
      <FileText size={18} strokeWidth={1.75} className="text-muted-foreground" />
      <span className="flex-1">{label}</span>
      <ArrowUpRight size={16} className="text-muted-foreground" />
    </Link>
  );
}

export function F1Modals({ open, onClose }: Props) {
  return (
    <>
      <Modal open={open === "f1-photos"} onClose={onClose} title="Photos and Awards">
        <div className="space-y-4">
          {f1Awards.map((group) => (
            <div key={group.group}>
              <h4 className="text-[14px] font-bold">{group.group}</h4>
              <ul className="mt-1 space-y-0.5 text-[15px] leading-relaxed text-foreground/85">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 items-start gap-3">
          {f1Photos.map((src) => (
            <FallbackImage
              key={src}
              src={asset(src)}
              alt="F1 in Schools team photo"
              loading="lazy"
              className="h-auto w-full rounded-[10px]"
              fallbackClassName="aspect-[4/3]"
            />
          ))}
        </div>
      </Modal>

      <Modal open={open === "f1-docs"} onClose={onClose} title="Documentation">
        <div className="space-y-2">
          {f1Docs.main.map((d) => (
            <DocRow key={d.viewKey} {...d} />
          ))}
        </div>
        <h4 className="mt-6 text-[14px] font-bold text-muted-foreground">Booklets we wrote as a deliverable</h4>
        <div className="mt-2 space-y-2">
          {f1Docs.booklets.map((d) => (
            <DocRow key={d.viewKey} {...d} />
          ))}
        </div>
      </Modal>
    </>
  );
}
