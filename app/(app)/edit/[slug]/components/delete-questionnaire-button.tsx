"use client";

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
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
import { Questionnaire } from "@/app/(app)/create/page";
import { useEditStore } from "../zustand";

export function QuestionnaireSettings() {
  const questionnaire = useEditStore((state) => state.questionnaire);

  const changeName = useEditStore((state) => state.changeName);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-muted" variant={"secondary"} size={"icon"}>
          <Settings size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            YOU NEED TO SAVE TO MAKE CHANGES TAKE EFFECT
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={questionnaire.name}
            onChange={(e) => {
              changeName(e.target.value);
            }}
          />
        </div>
        <hr />
        <span className="text-xs font-semibold">DANGER ZONE</span>
        <Button variant={"destructive"}>Delete</Button>
      </DialogContent>
    </Dialog>
  );
}
