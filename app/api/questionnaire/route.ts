import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { questionnaires } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Error", { status: 400 });
  const body = (await request.json()) as {
    id: string;
    name: string;
    description: string;
    userId: string;
    json: any[];
  };
  console.log("New Request", body);
  await db.insert(questionnaires).values(body!);

  revalidatePath("/create");
  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
