import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { questionnaires } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";
import { ArrowUpRight, Pen } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { session } = await getUserAuth();

  const myquestionnaires = await db
    .select()
    .from(questionnaires)
    .where(eq(questionnaires.userId, session!.user.id));

  return (
    <main className="space-y-4 p-6">
      {myquestionnaires.map((q, i) => (
        <div key={q.id} className="bg-muted w-[25vw] h-[10vh] rounded p-2">
          <div className="flex justify-between">
            <h3>{q.name}</h3>
            <span className="flex gap-1">
              <Link className="flex items-center" href={`/edit/${q.id}`}>
                <Pen size={17} />
              </Link>
              <Link href={`/questionnaire/${q.id}`} target="_blank">
                <ArrowUpRight />
              </Link>
            </span>
          </div>
          <h4 className="text-sm">{q.description}</h4>
        </div>
      ))}
    </main>
  );
}
