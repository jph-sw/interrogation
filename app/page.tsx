import { ModeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

export default function LandingPage() {
  return (
    <div>
      <header>
        <nav className="h-[5vh] w-full border-b flex items-center px-2 justify-between">
          <span className="font-semibold">Interrogation</span>
          <div className="flex items-center gap-2">
            <Button variant={"link"} asChild>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
            <ModeToggle />
          </div>
        </nav>
      </header>
      <main>
        <h1 className={cn("py-12 text-5xl text-center", instrument.className)}>
          Interrogation
        </h1>
        <h2 className={"text-center"}>
          Create your own questions and answers by visiting{" "}
          <code className="bg-muted rounded p-1">
            <Link href={"/create"}>/create</Link>
          </code>
        </h2>
      </main>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
