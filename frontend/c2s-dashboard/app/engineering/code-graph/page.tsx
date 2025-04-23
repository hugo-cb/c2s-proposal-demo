"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ProjectSelector } from "@/components/dashboard/project-selector";
import { CodeGraph } from "@/components/engineering/code-graph";
import { Button } from "@/components/ui/button";
import { Maximize2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CodeGraphPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/engineering">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Code Dependency Graph</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={toggleFullscreen} className="gap-1">
              <Maximize2 className="h-4 w-4" />
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
            <div className="w-[300px]">
              <ProjectSelector />
            </div>
          </div>
        </div>

        <div className={`w-full ${isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[calc(100vh-200px)]'}`}>
          <CodeGraph className="h-full" isFullscreenPage={isFullscreen} />
        </div>
      </div>
    </AppShell>
  );
}
