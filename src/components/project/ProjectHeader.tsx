import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/tanstack-react-start";
import { ClientOnly, useNavigate } from "@tanstack/react-router";
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

      <div className="flex-shrink-0">
        <ClientOnly>
          <SignedIn treatPendingAsSignedOut>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "size-10 ring-2 ring-zinc-800 hover:ring-coral transition-all duration-200",
                  userButtonPopoverCard: "bg-zinc-900 border border-zinc-800",
                  userButtonPopoverActionButton:
                    "text-zinc-300 hover:text-coral hover:bg-zinc-800 transition-colors",
                  userButtonPopoverActionButtonText: "font-montserrat",
                  userButtonPopoverFooter: "hidden",
                },
                variables: {
                  colorPrimary: "oklch(0.65 0.18 35)",
                  colorBackground: "oklch(0.08 0.005 0)",
                  colorText: "oklch(0.85 0 0)",
                  borderRadius: "0.625rem",
                },
              }}
            />
          </SignedIn>
        </ClientOnly>
        <SignedOut>
          <SignInButton mode="modal">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100"
              aria-label="Sign in"
            >
              <User className="h-5 w-5" />
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}
