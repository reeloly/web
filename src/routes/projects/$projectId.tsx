import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectPage,
});

function ProjectPage() {
  const { projectId } = Route.useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Project Page</h1>
      <p className="text-muted-foreground mt-2">Project ID: {projectId}</p>
    </div>
  );
}
