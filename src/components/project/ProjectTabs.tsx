import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectTabsProps {
	chatContent: React.ReactNode;
	videoContent: React.ReactNode;
}

export function ProjectTabs({ chatContent, videoContent }: ProjectTabsProps) {
	return (
		<Tabs defaultValue="chat" className="flex flex-col flex-1 min-h-0">
			{/* Tab navigation */}
			<TabsList className="w-full mb-4">
				<TabsTrigger value="chat" className="flex-1">
					Chat
				</TabsTrigger>
				<TabsTrigger value="preview" className="flex-1">
					Preview
				</TabsTrigger>
			</TabsList>

			{/* Chat tab content */}
			<TabsContent value="chat" className="flex-1 min-h-0 overflow-hidden">
				{chatContent}
			</TabsContent>

			{/* Preview tab content */}
			<TabsContent value="preview" className="flex-1 min-h-0 overflow-hidden">
				{videoContent}
			</TabsContent>
		</Tabs>
	);
}
