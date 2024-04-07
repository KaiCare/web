import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

export const messageBuilder = (role: "user" | "bot", message: string) => {
  return {
    role,
    content: message,
  };
};

export interface Message {
  role: "user" | "bot";
  content: string;
}
