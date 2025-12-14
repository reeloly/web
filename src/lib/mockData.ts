import type { Project } from "@/types/project";
import type { ChatMessage } from "@/types/chat";
import { MessageRole } from "@/types/chat";

// Mock function to generate project data
export function getMockProjects(): Project[] {
	return [
		{
			id: "1",
			name: "Summer Product Launch",
			description: "Promotional video for new product line",
			userId: "user-1",
			createdAt: new Date("2024-03-15"),
			updatedAt: new Date("2024-03-18"),
			thumbnailUrl:
				"https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop",
		},
		{
			id: "2",
			name: "Brand Story",
			description: "Company history and values showcase",
			userId: "user-1",
			createdAt: new Date("2024-03-10"),
			updatedAt: new Date("2024-03-12"),
			thumbnailUrl:
				"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop",
		},
		{
			id: "3",
			name: "Customer Testimonials",
			description: "Compilation of customer reviews and feedback",
			userId: "user-1",
			createdAt: new Date("2024-03-05"),
			updatedAt: new Date("2024-03-08"),
			thumbnailUrl:
				"https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop",
		},
		{
			id: "4",
			name: "Holiday Campaign 2024",
			description: "Festive season marketing video",
			userId: "user-1",
			createdAt: new Date("2024-02-28"),
			updatedAt: new Date("2024-03-02"),
			thumbnailUrl:
				"https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=450&fit=crop",
		},
		{
			id: "5",
			name: "Product Demo",
			description: "Step-by-step product walkthrough",
			userId: "user-1",
			createdAt: new Date("2024-02-20"),
			updatedAt: new Date("2024-02-25"),
			thumbnailUrl:
				"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
		},
		{
			id: "6",
			name: "Social Media Teaser",
			description: "Quick 15-second attention grabber",
			userId: "user-1",
			createdAt: new Date("2024-02-15"),
			updatedAt: new Date("2024-02-18"),
			thumbnailUrl:
				"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
		},
	];
}

// Mock function to create a new project
export function createMockProject(description: string): Project {
	const id = `project-${Date.now()}`;
	const name = description.slice(0, 50) || "Untitled Project";

	return {
		id,
		name,
		description,
		userId: "user-1",
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}

// Mock function to get chat messages for a project
export function getMockChatMessages(projectId: string): ChatMessage[] {
	// Return different mock conversations based on projectId
	const conversations: Record<string, ChatMessage[]> = {
		"1": [
			{
				id: "msg-1-1",
				projectId: "1",
				role: MessageRole.SYSTEM,
				content: "Project created. Let's start creating your video!",
				createdAt: new Date("2024-03-15T10:00:00"),
			},
			{
				id: "msg-1-2",
				projectId: "1",
				role: MessageRole.USER,
				content:
					"I want to create a promotional video for our new summer product line. It should be upbeat and colorful.",
				createdAt: new Date("2024-03-15T10:01:00"),
			},
			{
				id: "msg-1-3",
				projectId: "1",
				role: MessageRole.ASSISTANT,
				content:
					"Great! I'll create a vibrant summer promotional video for you. I'm thinking bright colors, energetic transitions, and a upbeat soundtrack. Would you like me to include product shots, lifestyle scenes, or both?",
				createdAt: new Date("2024-03-15T10:01:30"),
			},
			{
				id: "msg-1-4",
				projectId: "1",
				role: MessageRole.USER,
				content: "Both would be perfect! Can you add some beach scenes too?",
				createdAt: new Date("2024-03-15T10:02:00"),
			},
			{
				id: "msg-1-5",
				projectId: "1",
				role: MessageRole.ASSISTANT,
				content:
					"Absolutely! I'll incorporate beach scenes along with product shots and lifestyle footage. The video will have a summer vacation vibe with your products featured naturally. I'll start rendering the preview now.",
				createdAt: new Date("2024-03-15T10:02:15"),
			},
		],
		"2": [
			{
				id: "msg-2-1",
				projectId: "2",
				role: MessageRole.SYSTEM,
				content: "Project created. Ready to tell your brand story!",
				createdAt: new Date("2024-03-10T14:00:00"),
			},
			{
				id: "msg-2-2",
				projectId: "2",
				role: MessageRole.USER,
				content:
					"I need a video that tells our company's story - from our humble beginnings to where we are today.",
				createdAt: new Date("2024-03-10T14:01:00"),
			},
			{
				id: "msg-2-3",
				projectId: "2",
				role: MessageRole.ASSISTANT,
				content:
					"I'll create an inspiring brand story video for you. I'll use a documentary-style approach with vintage footage transitions, inspiring music, and compelling narration. Should we include founder interviews or testimonials?",
				createdAt: new Date("2024-03-10T14:01:45"),
			},
		],
		"3": [
			{
				id: "msg-3-1",
				projectId: "3",
				role: MessageRole.SYSTEM,
				content: "Project created. Let's showcase your customer testimonials!",
				createdAt: new Date("2024-03-05T09:00:00"),
			},
		],
	};

	// Return the conversation for the project, or an empty array for new projects
	return conversations[projectId] || [];
}
