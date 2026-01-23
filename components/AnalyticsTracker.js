"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_location: window.location.href,
        page_path: pathname,
        version_number: "1",
      });
    }
  }, [pathname]);

  return null;
}