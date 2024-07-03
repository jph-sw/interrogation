"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docJson } from "@/app/(app)/create/zustand";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export function RenderJson(json: { json: docJson[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div>
      {json.json.map((page, pageIndex) => (
        <div
          key={page.title + pageIndex}
          className={`h-screen w-full p-4 overflow-auto flex justify-center ${
            currentPage === pageIndex ? "" : "hidden"
          }`}
        >
          <div className="bg-slate-50 w-1/2 p-4">
            <h1 className={"text-2xl font-semibold"}>{page.title}</h1>
            {Array.isArray(page.content) &&
              page.content.map((question, questionIndex) => (
                <div className="py-2" key={question.name + questionIndex}>
                  <h2 className="text-xl">{question.title}</h2>
                  <Input className="bg-background" type={question.type} />
                </div>
              ))}
            <div className="flex gap-1 justify-center sticky bottom-0">
              <Button
                disabled={currentPage == 0}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft />
              </Button>
              <Button
                disabled={currentPage == json.json.length - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
