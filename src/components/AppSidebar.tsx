import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/tanstack-react-start";
import { Link, useLocation } from "@tanstack/react-router";
import { FolderOpen, Home, LogIn } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Projects", path: "/projects", icon: FolderOpen },
];

function UserFooterSignedIn({
  user,
}: {
  user: { name: string; email: string; avatar: string };
}) {
  return (
    // <UserButton
    //   appearance={{
    //     elements: {
    //       rootBox: "w-full",
    //       userButtonBox: "flex-row-reverse w-full",
    //       userButtonTrigger:
    //         "flex items-center gap-2 px-2 py-2 w-full rounded-md hover:bg-sidebar-accent/50 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-coral",
    //       avatarBox:
    //         "size-8 ring-2 ring-sidebar-border group-hover:ring-coral transition-all duration-200",
    //       userButtonOuterIdentifier: "flex-1 text-left overflow-hidden pl-2",
    //       userButtonInnerIdentifier:
    //         "text-sm font-medium text-sidebar-foreground truncate",
    //       userButtonPopoverCard: "bg-zinc-900 border border-zinc-800 shadow-xl",
    //       userButtonPopoverActionButton:
    //         "text-zinc-300 hover:text-coral hover:bg-zinc-800 transition-colors",
    //       userButtonPopoverActionButtonText: "font-montserrat",
    //       userButtonPopoverFooter: "hidden",
    //       userButtonPopoverActionButtonIcon: "text-zinc-400",
    //     },
    //     variables: {
    //       colorPrimary: "oklch(0.65 0.18 35)",
    //       colorBackground: "oklch(0.08 0.005 0)",
    //       colorText: "oklch(0.85 0 0)",
    //       borderRadius: "0.625rem",
    //     },
    //   }}
    //   showName
    // />
    <NavUser user={user} />
  );
}

function UserFooterSignedOut() {
  return (
    <SignInButton mode="modal">
      <div className="flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer group hover:bg-sidebar-accent/50 transition-colors">
        <div className="inline-flex size-8 items-center justify-center rounded-lg border-2 border-sidebar-border/60 text-sidebar-foreground/60 transition-all group-hover:border-coral group-hover:text-coral group-hover:bg-coral/5 shrink-0">
          <LogIn className="size-4" />
        </div>
        <span className="text-sm font-medium text-sidebar-foreground/80 group-hover:text-sidebar-foreground transition-colors group-data-[collapsible=icon]:hidden">
          Sign in
        </span>
      </div>
    </SignInButton>
  );
}

export function AppSidebar() {
  const { pathname } = useLocation();
  const { user } = useUser();

  return (
    <Sidebar collapsible="icon">
      {/* Header with Reeloly Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              to="/"
              className="flex items-center gap-2 px-2 py-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar rounded-lg"
            >
              <img
                src="/reeloly-wordmark.svg"
                alt="Reeloly"
                className="h-8 w-auto text-coral transition-transform duration-200 group-hover:scale-105 group-data-[collapsible=icon]:hidden"
              />
              <span className="text-coral text-xl font-extrabold group-data-[collapsible=icon]:block hidden">
                R
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <Link to={item.path}>
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* User Section */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SignedIn>
              {user && (
                <UserFooterSignedIn
                  user={{
                    name: user.fullName ?? "",
                    email: user.emailAddresses[0].emailAddress ?? "",
                    avatar: user.imageUrl ?? "",
                  }}
                />
              )}
            </SignedIn>
            <SignedOut>
              <UserFooterSignedOut />
            </SignedOut>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
