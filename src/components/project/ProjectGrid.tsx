import { Film } from 'lucide-react'
import type { Project } from '@/types/project'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <Film className="h-12 w-12 text-zinc-700" />
        <h3 className="mt-4 text-base font-semibold text-zinc-400">
          No projects yet
        </h3>
        <p className="mt-1 text-sm text-zinc-600 max-w-md text-center">
          Create your first video project by describing what you want to create
          in the input box above
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="animate-fade-in-up"
          style={{
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'both',
          }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}
