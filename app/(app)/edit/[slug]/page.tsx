import { db } from "@/lib/db";
import { questionnaires } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppWindow, Code2 } from "lucide-react";
import { GuiEditor } from "./components/gui-editor";
import { Textarea } from "@/components/ui/textarea";
import { editJson } from "./zustand";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Page({ params }: { params: { slug: string } }) {
  const { session } = await getUserAuth();
  const currentquestionnaire = await db
    .select()
    .from(questionnaires)
    .where(eq(questionnaires.id, params.slug));

  const newtest: editJson[] = JSON.parse(JSON.stringify(currentquestionnaire));

  return (
    <div className="p-6 lg:p-12 w-full">
      <div className="flex flex-col gap-1 w-full">
        <h1>
          Editing <b>{currentquestionnaire[0].name}</b>
        </h1>
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
          </div>

          <TabsContent value="gui">
            <GuiEditor
              json={newtest}
              questionnaire={currentquestionnaire[0]}
              userId={session!.user.id || ""}
            />
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
