import { Link } from "@tanstack/react-router";
import { Calendar, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Project } from "@/types/project";

interface ProjectCardProps {
	project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(project.updatedAt);

	return (
		<Link
			to="/projects/$projectId"
			params={{ projectId: project.id }}
			className="group block"
		>
			<Card className="overflow-hidden border border-zinc-800 bg-zinc-900 transition-all duration-200 hover:border-zinc-700">
				{/* Thumbnail */}
				<div className="relative aspect-video overflow-hidden bg-zinc-950">
					{project.thumbnailUrl ? (
						<img
							src={project.thumbnailUrl}
							alt={project.name}
							className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-90"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center">
							<Play className="h-12 w-12 text-zinc-700" />
						</div>
					)}

					{/* Play button overlay */}
					<div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-black/50">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-coral">
							<Play className="h-6 w-6 text-white" fill="currentColor" />
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="p-4 space-y-2">
					<h3 className="text-sm font-semibold text-zinc-100 line-clamp-1">
						{project.name}
					</h3>

					{project.description && (
						<p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
							{project.description}
						</p>
					)}

					<div className="flex items-center gap-1.5 text-xs text-zinc-600">
						<Calendar className="h-3 w-3" />
						<span>{formattedDate}</span>
					</div>
				</div>
			</Card>
		</Link>
	);
}
