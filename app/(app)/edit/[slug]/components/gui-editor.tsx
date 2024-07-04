"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save, X } from "lucide-react";
import { editJson, useEditStore } from "../zustand";
import { startTransition, useEffect } from "react";
import { toast } from "sonner";
import { Questionnaire } from "@/app/(app)/create/page";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GuiEditor(props: { questionnaire: Questionnaire[] }) {
  const Questionnaire = useEditStore((state) => state.questionnaire);
  const addPage = useEditStore((state) => state.addPage);
  const addQuestion = useEditStore((state) => state.addQuestion);
  const removePage = useEditStore((state) => state.removePage);
  const setQuestionnaire = useEditStore((state) => state.setQuestionnaire);
  const changeQuestionType = useEditStore((state) => state.changeQuestionType);
  const changeQuestionTitle = useEditStore(
    (state) => state.changeQuestionTitle
  );

  useEffect(() => {
    setQuestionnaire(props.questionnaire);
  }, []);

  console.log("This is the current questionnaire", props.questionnaire);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    startTransition(async () => {
      const res = await fetch("/api/questionnaire/edit", {
        method: "PUT",
        body: JSON.stringify({
          id: Questionnaire.id,
          name: Questionnaire.name,
          description: "description",
          userId: Questionnaire.userId,
          json: Questionnaire.json,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200)
        toast.success("Successfully updated " + Questionnaire.name);
      // router.refresh();
    });
  };

  return (
    <div className="w-full">
      <h1>Editing {Questionnaire.name}</h1>
      {Questionnaire.json.map((page, pageIndex) => (
        <div
          key={page.title + pageIndex}
          className="bg-muted p-4 rounded-lg lg:w-1/2 mb-2"
        >
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl">{page.title}</h2>
            <button
              onClick={() => {
                removePage(pageIndex);
              }}
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-y-2">
            {page.content &&
              page.content.map((question, questionIndex) => (
                <div
                  key={question.name + questionIndex}
                  className="border-b py-2"
                >
                  <Label htmlFor={question.name + "-title-edit"}>Title</Label>
                  <Input
                    id={question.name + "-title-edit"}
                    value={question.title}
                    onChange={(e) =>
                      changeQuestionTitle(question.name, e.target.value)
                    }
                    className="my-1"
                  />
                  <div className="flex gap-1">
                    <div className="w-1/2">
                      <Label htmlFor={question.name + "-name-edit"}>Name</Label>
                      <Input
                        id={question.name + "edit"}
                        value={question.name}
                        readOnly
                      />
                    </div>
                    <div className="w-1/2">
                      <Label htmlFor={question.name + "-type-edit"}>Type</Label>
                      <Select
                        defaultValue={question.type}
                        onValueChange={(e) =>
                          changeQuestionType(question.name, e)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            <div className="py-2">
              <Button
                className="w-full"
                variant={"secondary"}
                onClick={() => addQuestion(pageIndex)}
              >
                Add question
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="w-full lg:w-1/2">
        <Button
          className="w-full flex gap-2 items-center"
          variant={"outline"}
          onClick={() => addPage()}
        >
          Add page <Plus size={16} />
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="bg-muted p-2 rounded-lg">
              <Save />
            </button>
          </TooltipTrigger>
          <TooltipContent>Save Questionnaire</TooltipContent>
        </Tooltip>
      </form>
    </div>
  );
}
