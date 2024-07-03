"use client";
import { Input } from "@/components/ui/input";
import { Info, Pencil, Save, X } from "lucide-react";
import { Question } from "../page";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDocStore } from "../zustand";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function EditableQuestion(props: {
  question: Question;
  questionIndex: number;
  pageIndex: number;
}) {
  const editQuestionType = useDocStore((state) => state.changeQuestionType);
  const editQuestionName = useDocStore((state) => state.changeQuestionName);
  const removeQuestion = useDocStore((state) => state.removeQuestion);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      key={props.question.title + props.questionIndex}
      className="group p-2 bg-background rounded shadow-sm border hover:shadow-md transition-all"
    >
      {isEditing ? (
        <div className="min-h-[18vh] py-2">
          <div>
            <Label htmlFor="title-input">Title</Label>
            <Input id="title-input" value={props.question.title} />
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <div className="flex items-center pt-2 pb-1 gap-1">
                <Label htmlFor="name-input">Name</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={13} />
                    <TooltipContent>
                      This name is only used for identification purposes
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </div>
              <Input
                id="name-input"
                value={props.question.name}
                onChange={(e) =>
                  editQuestionName(props.question.name, e.target.value)
                }
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="type-select">Type</Label>
              <Select
                value={props.question.type}
                onValueChange={(e: string) =>
                  editQuestionType(props.question.name, e)
                }
              >
                <SelectTrigger id="type-select">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="number">number</SelectItem>
                  <SelectItem value="text">text</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="py-2 flex justify-center">
            <Button
              variant={"secondary"}
              className="w-1/2"
              onClick={() => setIsEditing(false)}
            >
              <Save size={24} />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            {props.question.title}{" "}
            <div className="flex gap-3">
              <button
                className="hidden group-hover:block p-1"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Pencil size={16} />
              </button>
              <button
                className="hidden group-hover:flex rounded hover:bg-red-500 justify-center items-center p-1"
                onClick={() =>
                  removeQuestion(props.pageIndex, props.questionIndex)
                }
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <Input type={props.question.type} />
        </>
      )}
    </div>
  );
}
