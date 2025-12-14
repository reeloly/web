import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/")({
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
        My Projects
      </h1>
      <div className="text-muted-foreground">
        Your projects will appear here
      </div>
    </div>
  );
}
