import { db } from "@/lib/db";
import { questionnaires } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppWindow, Code2 } from "lucide-react";
import { GuiEditor } from "./components/gui-editor";
import { Textarea } from "@/components/ui/textarea";
import { editJson } from "./zustand";
import { getUserAuth } from "@/lib/auth/utils";
import { Questionnaire } from "../../create/page";
import { QuestionnaireSettings } from "./components/delete-questionnaire-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interrogation - Edit",
  description: "Edit a questionnaire",
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

export default async function Page({ params }: { params: { slug: string } }) {
  const { session } = await getUserAuth();
  const currentquestionnaire = await db
    .select()
    .from(questionnaires)
    .where(eq(questionnaires.id, params.slug));

  const newtest: Questionnaire[] = JSON.parse(
    JSON.stringify(currentquestionnaire)
  );

  return (
    <div className="p-6 lg:p-12 w-full">
      <div className="flex flex-col gap-1 w-full">
        <Tabs defaultValue="gui">
          <div className="flex justify-between items-center w-full lg:w-1/2">
            <TabsList className="flex justify-between w-[96px]">
              <div>
                <TabsTrigger value="gui">
                  <AppWindow size={20} />
                </TabsTrigger>
                <TabsTrigger value="code">
                  <Code2 size={20} />
                </TabsTrigger>
              </div>
            </TabsList>
            <QuestionnaireSettings />
          </div>

          <TabsContent value="gui">
            <GuiEditor questionnaire={newtest} />
          </TabsContent>
          <TabsContent value="code">
            <Textarea
              className="h-[60vh]"
              value={JSON.stringify(currentquestionnaire, null, 2)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
