import { getUserAuth } from "@/lib/auth/utils";
import { Editor } from "./components/editor";
import { editJson } from "../edit/[slug]/zustand";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interrogation - Create",
  description: "Create a questionnaire",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icon.svg",
        href: "/icon.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icon.svg",
        href: "/icon.svg",
      },
    ],
  },
};
export default async function Page() {
  const { session } = await getUserAuth();

  return (
    <div className="p-6">
      <Editor userId={session!.user.id} />
    </div>
  );
}

export interface Questionnaire {
  id: string;
  name: string;
  userId: string;
  json: editJson[];
}

export interface Question {
  name: string;
  title: string;
  type: string;
}
