import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Video } from "lucide-react";
import { type ChangeEvent, type KeyboardEvent, useRef, useState } from "react";
import { ProjectGrid } from "@/components/project/ProjectGrid";
import { Button } from "@/components/ui/button";
import { createMockProject, getMockProjects } from "@/lib/mockData";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [projects, setProjects] = useState(getMockProjects());
  const [isInputFocused, setIsInputFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    // Create new project and navigate
    const newProject = createMockProject(inputValue);
    setProjects([newProject, ...projects]);

    // Navigate to project page
    navigate({
      to: "/projects/$projectId",
      params: { projectId: newProject.id },
    });

    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen cinematic-bg">
      {/* Hero Section - Centered like ChatGPT/Claude/Lovable */}
      <section className="relative px-4 md:px-8 lg:px-12 min-h-[80vh] flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          {/* Prompt text */}
          <h1 className="text-center text-2xl md:text-3xl font-bold text-zinc-100 mb-6">
            What video would you like to create?
          </h1>

          {/* Input Box */}
          <div className="relative">
            <div
              className={`relative rounded-lg bg-zinc-900 border transition-colors duration-200 ${
                isInputFocused ? "border-coral" : "border-zinc-800"
              }`}
            >
              <div className="relative p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-coral-subtle">
                      <Video className="h-4 w-4 text-coral" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      onKeyDown={handleKeyDown}
                      placeholder="Describe the video you want to create..."
                      rows={1}
                      className="w-full resize-none bg-transparent text-zinc-100 placeholder:text-zinc-600 outline-none text-base md:text-lg font-normal leading-relaxed"
                      style={{ maxHeight: "200px" }}
                    />

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-zinc-600">
                        Press{" "}
                        <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-400 font-mono text-xs">
                          Enter
                        </kbd>{" "}
                        to create
                      </span>

                      <Button
                        onClick={handleSubmit}
                        disabled={!inputValue.trim()}
                        className="bg-coral-hover text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed group"
                      >
                        Create Project
                        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="relative px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-1">
              Recent Projects
            </h2>
            <p className="text-sm text-zinc-600">
              Pick up where you left off or start something new
            </p>
          </div>

          <ProjectGrid projects={projects} />
        </div>
      </section>
    </div>
  );
}
