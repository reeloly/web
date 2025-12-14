import { MessageSquare, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectTabsProps {
  chatContent: React.ReactNode;
  videoContent: React.ReactNode;
}

export function ProjectTabs({ chatContent, videoContent }: ProjectTabsProps) {
  return (
    <Tabs defaultValue="chat" className="flex flex-col flex-1 min-h-0">
      {/* Content area - takes up all available space */}
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Chat tab content */}
        <TabsContent
          value="chat"
          className="flex-1 min-h-0 overflow-hidden m-0 data-[state=inactive]:hidden"
        >
          {chatContent}
        </TabsContent>

        {/* Preview tab content */}
        <TabsContent
          value="preview"
          className="flex-1 min-h-0 overflow-hidden m-0 data-[state=inactive]:hidden"
        >
          {videoContent}
        </TabsContent>
      </div>

      {/* Bottom tab navigation - fixed at bottom */}
      <TabsList className="w-full mt-4 h-14 grid grid-cols-2 bg-zinc-900/90 backdrop-blur-sm border-t border-zinc-800">
        <TabsTrigger
          value="chat"
          className="flex flex-col gap-1 h-full data-[state=active]:bg-zinc-800"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs">Chat</span>
        </TabsTrigger>
        <TabsTrigger
          value="preview"
          className="flex flex-col gap-1 h-full data-[state=active]:bg-zinc-800"
        >
          <Video className="h-5 w-5" />
          <span className="text-xs">Preview</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
