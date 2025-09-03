"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Tabs({ tabs }: { tabs: string[] }) {
  const [active, setActive] = useState(tabs[0]);
  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg border border-brand-border">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={cn(
            "px-3 py-1.5 rounded-md font-semibold text-sm transition",
            active === tab ? "bg-white text-brand-text border border-brand-border" : "text-brand-muted"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
