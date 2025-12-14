import type { Project } from '@/types/project'

// Mock function to generate project data
export function getMockProjects(): Project[] {
  return [
    {
      id: '1',
      name: 'Summer Product Launch',
      description: 'Promotional video for new product line',
      userId: 'user-1',
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date('2024-03-18'),
      thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop',
    },
    {
      id: '2',
      name: 'Brand Story',
      description: 'Company history and values showcase',
      userId: 'user-1',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-12'),
      thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop',
    },
    {
      id: '3',
      name: 'Customer Testimonials',
      description: 'Compilation of customer reviews and feedback',
      userId: 'user-1',
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-03-08'),
      thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop',
    },
    {
      id: '4',
      name: 'Holiday Campaign 2024',
      description: 'Festive season marketing video',
      userId: 'user-1',
      createdAt: new Date('2024-02-28'),
      updatedAt: new Date('2024-03-02'),
      thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=450&fit=crop',
    },
    {
      id: '5',
      name: 'Product Demo',
      description: 'Step-by-step product walkthrough',
      userId: 'user-1',
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-02-25'),
      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    },
    {
      id: '6',
      name: 'Social Media Teaser',
      description: 'Quick 15-second attention grabber',
      userId: 'user-1',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-18'),
      thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop',
    },
  ]
}

// Mock function to create a new project
export function createMockProject(description: string): Project {
  const id = `project-${Date.now()}`
  const name = description.slice(0, 50) || 'Untitled Project'

  return {
    id,
    name,
    description,
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
