import { createFileRoute } from "@tanstack/react-router";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { getMockProjects } from "@/lib/mockData";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectPage,
});

function ProjectPage() {
  const { projectId } = Route.useParams();

  // Get project data from mock data
  const project = getMockProjects().find((p) => p.id === projectId);

  return (
    <div className="h-screen cinematic-bg flex flex-col overflow-hidden">
      {/* Page container with responsive padding */}
      <div className="px-4 md:px-6 lg:px-8 py-6 flex-1 flex flex-col min-h-0">
        {/* Project-level header with back button and user avatar */}
        <ProjectHeader
          projectName={project?.name || "Untitled Project"}
          projectDescription={project?.description}
        />

        {/* Flexible layout container: mobile-first (flex-col), desktop (flex-row) */}
        <div className="flex flex-col lg:flex-row lg:gap-6 flex-1 min-h-0">
          {/* Placeholder for Chat Sidebar (Task 9) */}
          <div className="w-full lg:w-96 xl:w-[28rem] bg-zinc-900 rounded-lg p-4 mb-4 lg:mb-0 overflow-auto">
            <p className="text-zinc-400 text-sm">
              Chat Sidebar (Coming in Task 9)
            </p>
          </div>

          {/* Placeholder for Video Preview Panel (Task 10) */}
          <div className="w-full lg:flex-1 bg-zinc-900 rounded-lg p-4 overflow-auto">
            <p className="text-zinc-400 text-sm">
              Video Preview Panel (Coming in Task 10)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
