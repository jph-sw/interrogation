"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <div className="space-y-3">
        <Button
          variant={"destructive"}
          className="w-full flex gap-2 items-center"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out <LogOut size={16} />
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <p>Not signed in </p>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
