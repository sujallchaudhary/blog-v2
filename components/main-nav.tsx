import Link from "next/link";
import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 flex flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden text-lg font-bold sm:inline-block">
              Sujal Unfolded
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-4 sm:justify-start">
          <Link href="/">
            <Button size="sm" variant={'ghost'} className="flex items-center space-x-2">
              <House className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Button>
          </Link>
        </nav>
        <div className="flex items-center justify-end space-x-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
