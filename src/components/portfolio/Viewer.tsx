import { useEffect, useState } from "react";
import { useCanGoBack, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { asset, documents } from "@/data/portfolio";

type Status = "checking" | "ready" | "missing";

/** Full-screen document/image viewer with a slim top bar. */
export function Viewer({ docKey }: { docKey: string }) {
  const doc = documents[docKey];
  const router = useRouter();
  const navigate = useNavigate();
  const canGoBack = useCanGoBack();
  const [status, setStatus] = useState<Status>(doc ? "checking" : "missing");
  const url = doc ? asset(doc.file) : "";

  useEffect(() => {
    if (!doc) return setStatus("missing");
    let cancelled = false;
    setStatus("checking");
    fetch(url, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        // A missing file can come back as the site's HTML page; treat that as missing too.
        const ok = res.ok && !type.includes("text/html");
        if (!cancelled) setStatus(ok ? "ready" : "missing");
      })
      .catch(() => !cancelled && setStatus("missing"));
    return () => {
      cancelled = true;
    };
  }, [doc, url]);

  const goBack = () => {
    if (canGoBack) router.history.back();
    else navigate({ to: "/" });
  };

  return (
    <div className="flex h-screen flex-col bg-viewer text-viewer-foreground">
      <header className="grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-viewer-border bg-viewer-bar px-3">
        <button
          type="button"
          onClick={goBack}
          aria-label="Back"
          className="flex w-fit items-center gap-2 rounded-[8px] px-2 py-1.5 text-[14px] text-viewer-muted transition-colors hover:text-viewer-foreground"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="truncate text-[15px] font-semibold">{doc?.title ?? "Document"}</h1>
        <div className="flex justify-end">
          {doc && status === "ready" && (
            <a
              href={url}
              download
              className="flex items-center gap-1.5 rounded-[8px] border border-viewer-border px-3 py-1 text-[13px] font-medium text-viewer-foreground transition-colors hover:bg-viewer-border"
            >
              <Download size={14} />
              Download
            </a>
          )}
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        {status === "missing" && (
          <div className="flex h-full items-center justify-center text-[16px] text-viewer-muted">
            This file has not been added yet.
          </div>
        )}
        {status === "ready" && doc?.type === "pdf" && (
          <iframe src={url} title={doc.title} className="h-full w-full border-0" />
        )}
        {status === "ready" && doc?.type === "image" && (
          <div className="flex h-full items-center justify-center p-6">
            <img src={url} alt={doc.title} className="max-h-full max-w-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}
