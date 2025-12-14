import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
	projectName: string;
	projectDescription?: string;
}

export function ProjectHeader({
	projectName,
	projectDescription,
}: ProjectHeaderProps) {
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate({ to: "/" });
	};

	return (
		<header className="flex items-start justify-between mb-6 gap-4">
			<div className="flex items-start gap-3 flex-1 min-w-0">
				<Button
					onClick={handleBackClick}
					variant="ghost"
					size="icon"
					className="mt-1 flex-shrink-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
				>
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<div className="flex-1 min-w-0">
					<h1 className="text-2xl md:text-3xl font-bold text-zinc-100 truncate">
						{projectName}
					</h1>
					{projectDescription && (
						<p className="text-sm text-zinc-600 mt-1 line-clamp-2">
							{projectDescription}
						</p>
					)}
				</div>
			</div>

			{/* User avatar placeholder - will be replaced with actual auth in Phase 5 */}
			<div className="flex-shrink-0">
				<div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
					<User className="h-5 w-5 text-zinc-400" />
				</div>
			</div>
		</header>
	);
}
