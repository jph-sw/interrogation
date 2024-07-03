"use client";
import { EditableQuestion } from "./edit-question";
import { useDocStore } from "../zustand";
import { Plus, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { RenderJson } from "@/components/renderJson";
import { toast } from "sonner";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Editor(props: { userId: string }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const json = useDocStore((state) => state.json);
  const addPage = useDocStore((state) => state.addPage);
  const addQuestion = useDocStore((state) => state.addQuestion);
  const removePage = useDocStore((state) => state.removePage);
  const router = useRouter();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    startTransition(async () => {
      const res = await fetch("/api/questionnaire", {
        method: "PUT",
        body: JSON.stringify({
          id: Math.random().toString(36),
          name: name,
          description: description,
          userId: props.userId,
          json,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) toast.success("Successfully updated email!");
      router.refresh();
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full lg:w-1/2 md:p-8 flex flex-col gap-2">
          {json.map((e, i) => (
            <div key={e.title + i} className="p-2 bg-muted rounded">
              <div className="flex justify-between">
                <h1 className="text-xl">{e.title}</h1>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={() => removePage(i)}>
                      <X size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Remove {e.title}</TooltipContent>
                </Tooltip>
              </div>
              {/* {e.description && <p className="font-light">{e.description}</p>} */}
              {Array.isArray(e.content) ? (
                <div className="flex flex-col gap-2">
                  {e.content.map((c, j) => (
                    <EditableQuestion
                      key={c.title + j}
                      question={c}
                      questionIndex={j}
                      pageIndex={i}
                    />
                  ))}
                  <div className="w-full flex justify-center">
                    <Button
                      className=""
                      variant={"outline"}
                      onClick={() => addQuestion(i)}
                    >
                      Add question
                    </Button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
          <Button
            variant={"outline"}
            className="flex gap-2"
            onClick={() => addPage()}
          >
            <Plus size={16} />
            Add Page
          </Button>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create questionnaire</DialogTitle>
            <DialogDescription>
              This action will create a new questionnaire
            </DialogDescription>
            <div>
              <form onSubmit={handleSubmit}>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button type="submit" className="mt-2">
                  Submit
                </Button>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
