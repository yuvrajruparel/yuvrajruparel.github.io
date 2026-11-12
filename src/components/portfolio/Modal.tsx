import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type Props = { open: boolean; onClose: () => void; title: string; children: ReactNode };

/** Centered pop-up over the page. Closes with X, Escape or a click outside; locks page scroll. */
export function Modal({ open, onClose, title, children }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-backdrop data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[760px] max-w-[calc(100vw-48px)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-[12px] border border-border bg-background focus:outline-none"
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <Dialog.Title className="text-[20px] font-bold">{title}</Dialog.Title>
            <Dialog.Close
              className="rounded-[8px] p-1.5 text-muted-foreground transition-colors hover:bg-chip hover:text-foreground"
              aria-label="Close"
            >
              <X size={18} />
            </Dialog.Close>
          </div>
          <div className="overflow-y-auto px-6 py-5">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
