"use client";

import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface ProjectResizableProps {
  chatContent: React.ReactNode;
  videoContent: React.ReactNode;
}

const STORAGE_KEY = "project-panel-sizes";

export function ProjectResizable({
  chatContent,
  videoContent,
}: ProjectResizableProps) {
  const [chatSize, setChatSize] = useState(40);
  const [videoSize, setVideoSize] = useState(60);

  // Load saved panel sizes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { chat, video } = JSON.parse(saved);
        setChatSize(chat);
        setVideoSize(video);
      } catch {
        // Ignore parsing errors, use defaults
      }
    }
  }, []);

  // Save panel sizes to localStorage when they change
  const handleResize = (sizes: number[]) => {
    const [chat, video] = sizes;
    setChatSize(chat);
    setVideoSize(video);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ chat, video }));
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={handleResize}
      className="flex-1 min-h-0"
    >
      {/* Chat Panel */}
      <ResizablePanel
        defaultSize={chatSize}
        minSize={25}
        maxSize={60}
        className="flex flex-col"
      >
        {chatContent}
      </ResizablePanel>

      {/* Resize Handle */}
      <ResizableHandle withHandle className="w-1 hover:bg-zinc-700" />

      {/* Video Preview Panel */}
      <ResizablePanel
        defaultSize={videoSize}
        minSize={40}
        maxSize={75}
        className="flex flex-col"
      >
        {videoContent}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
