import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** Classes for the gray box shown when the image is missing. */
  fallbackClassName?: string;
};

/** An image that turns into a plain gray box of the same size when the file is missing. */
export function FallbackImage({ className, fallbackClassName, onError, ...props }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // An error can fire before hydration, when React's onError is not attached yet.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return <div aria-hidden className={cn("bg-placeholder", className, fallbackClassName)} />;
  }

  return (
    <img
      ref={ref}
      className={className}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
      {...props}
    />
  );
}
