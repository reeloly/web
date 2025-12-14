import { createFileRoute } from "@tanstack/react-router";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectResizable } from "@/components/project/ProjectResizable";
import { ProjectTabs } from "@/components/project/ProjectTabs";
import { getMockProjects } from "@/lib/mockData";

export const Route = createFileRoute("/projects/$projectId")({
	component: ProjectPage,
});

function ProjectPage() {
	const { projectId } = Route.useParams();

	// Get project data from mock data
	const project = getMockProjects().find((p) => p.id === projectId);

	// Placeholder content for chat (will be replaced in Task 9)
	const chatContent = (
		<div className="bg-zinc-900 rounded-lg p-4 h-full overflow-auto">
			<p className="text-zinc-400 text-sm">Chat Sidebar (Coming in Task 9)</p>
		</div>
	);

	// Placeholder content for video preview (will be replaced in Task 10)
	const videoContent = (
		<div className="bg-zinc-900 rounded-lg p-4 h-full overflow-auto">
			<p className="text-zinc-400 text-sm">
				Video Preview Panel (Coming in Task 10)
			</p>
		</div>
	);

	return (
		<div className="h-screen cinematic-bg flex flex-col overflow-hidden">
			{/* Page container with responsive structure */}
			<div className="px-4 md:px-6 lg:px-8 py-6 flex-1 flex flex-col min-h-0">
				{/* Project-level header with back button and user avatar */}
				<ProjectHeader
					projectName={project?.name || "Untitled Project"}
					projectDescription={project?.description}
				/>

				{/* Mobile Layout: Tab-based (visible only on mobile) */}
				<div className="lg:hidden flex-1 min-h-0">
					<ProjectTabs chatContent={chatContent} videoContent={videoContent} />
				</div>

				{/* Desktop Layout: Resizable panels (visible only on desktop) */}
				<div className="hidden lg:flex flex-1 min-h-0">
					<ProjectResizable
						chatContent={chatContent}
						videoContent={videoContent}
					/>
				</div>
			</div>
		</div>
	);
}
