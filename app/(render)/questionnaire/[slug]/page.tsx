import { RenderJson } from "@/components/renderJson";
import { db } from "@/lib/db";
import { questionnaires } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";

export default async function Page({ params }: { params: { slug: string } }) {
  const currentquestionnaire = await db
    .select()
    .from(questionnaires)
    .where(eq(questionnaires.id, params.slug));

  console.log(currentquestionnaire[0].json);

  return (
    <div>
      <RenderJson json={currentquestionnaire[0].json} />
    </div>
  );
}
