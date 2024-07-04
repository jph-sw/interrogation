import { getUserAuth } from "@/lib/auth/utils";
import { Editor } from "./components/editor";
import { editJson } from "../edit/[slug]/zustand";

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
