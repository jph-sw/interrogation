import { create } from "zustand";

export type editJson = {
  title: string;
  content: {
    name: string;
    title: string;
    type: string;
  }[];
};

export type Questionnaire = {
  id: string;
  name: string;
  json: editJson[];
  userId?: string;
};

type editStore = {
  questionnaire: Questionnaire;
  changeQuestionType: (name: string, type: string) => void;
  changeQuestionName: (name: string, newName: string) => void;
  changeQuestionTitle: (name: string, newTitle: string) => void;
  addQuestion: (page: number) => void;
  addPage: () => void;
  removeQuestion: (page: number, question: number) => void;
  removePage: (page: number) => void;
  setQuestionnaire: (json: Questionnaire[]) => void;
  changeName: (name: string) => void;
};

export const useEditStore = create<editStore>((set) => ({
  questionnaire: {
    id: "1",
    name: "Test Questionnaire",
    json: [
      {
        title: "Page 1",
        content: [
          {
            name: "q1",
            title: "Question 1",
            type: "text",
          },
          {
            name: "q2",
            title: "Question 2",
            type: "number",
          },
        ],
      },
    ],
  },
  changeQuestionType: (name: string, type: string) => {
    set((state) => {
      const updatedJson = state.questionnaire.json.map((page: any) => {
        if (Array.isArray(page.content)) {
          const updatedContent = page.content.map((question: any) => {
            if (question.name === name) {
              return { ...question, type };
            }
            return question;
          });
          return { ...page, content: updatedContent };
        }
        return page;
      });

      return { questionnaire: { ...state.questionnaire, json: updatedJson } };
    });
  },
  changeQuestionName: (name: string, newName: string) => {
    set((state) => {
      const updatedJson = state.questionnaire.json.map((page: any) => {
        if (Array.isArray(page.content)) {
          const updatedContent = page.content.map((question: any) => {
            if (question.name === name) {
              return { ...question, name: newName };
            }
            return question;
          });
          return { ...page, content: updatedContent };
        }
        return page;
      });

      return { questionnaire: { ...state.questionnaire, json: updatedJson } };
    });
  },
  changeQuestionTitle: (name: string, newTitle: string) => {
    set((state) => {
      const updatedJson = state.questionnaire.json.map((page: any) => {
        if (Array.isArray(page.content)) {
          const updatedContent = page.content.map((question: any) => {
            if (question.name === name) {
              return { ...question, title: newTitle };
            }
            return question;
          });
          return { ...page, content: updatedContent };
        }
        return page;
      });

      return { questionnaire: { ...state.questionnaire, json: updatedJson } };
    });
  },
  addQuestion: (page: number) => {
    set((state) => {
      const updatedJson = state.questionnaire.json.map((p, i) => {
        if (i === page) {
          return {
            ...p,
            content: p.content.concat({
              name: `q${p.content.length + 1}`,
              title: `Question ${p.content.length + 1}`,
              type: "text",
            }),
          };
        }
        return p;
      });

      return { questionnaire: { ...state.questionnaire, json: updatedJson } };
    });
  },
  removeQuestion: (page: number, question: number) => {
    set((state) => {
      const updatedJson = state.questionnaire.json.map((p, i) => {
        if (i === page) {
          return {
            ...p,
            content: p.content.filter((_, j) => j !== question),
          };
        }
        return p;
      });

      return { questionnaire: { ...state.questionnaire, json: updatedJson } };
    });
  },
  addPage: () => {
    set((state) => {
      const updatedJson = state.questionnaire.json.concat({
        title: "New Page",
        content: [],
      });

      return { questionnaire: { ...state.questionnaire, json: updatedJson } };
    });
  },
  removePage: (page: number) => {
    set((state) => {
      const updatedJson = state.questionnaire.json.filter((_, i) => i !== page);

      return { questionnaire: { ...state.questionnaire, json: updatedJson } };
    });
  },
  setQuestionnaire: (questionnaire: Questionnaire[]) => {
    set((state) => ({ questionnaire: questionnaire[0] }));
  },
  changeName: (name: string) => {
    set((state) => ({
      questionnaire: { ...state.questionnaire, name },
    }));
  },
}));
