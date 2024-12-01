"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

function ChatToDocument({ doc }: { doc: Y.Doc }) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuestion(input);

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input, documentData }),
        },
      );

      try {
        const id = toast.loading("Asking question...");
        // Parse the JSON and specify the type
        const data = await res.json();
        const message = data.message;

        setInput("");
        setSummary(message);
        toast.success("Question asked successfully!", {
          id,
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to get response");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <MessageCircleCode className="mr-2" />
          Chat to Document
        </DialogTrigger>
      </Button>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Chat to the Document!</DialogTitle>
          <DialogDescription>
            Ask a question and chat to the document with AI.
          </DialogDescription>

          <hr className="mt-5" />

          {question && (
            <p className="mt-5 text-center text-gray-500">Q: {question}</p>
          )}
        </DialogHeader>

        {summary && (
          <div className="flex max-h-96 flex-col items-start gap-2 overflow-y-scroll bg-gray-100 p-5">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "is thinking..." : "Says:"}
              </p>
            </div>
            <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
          </div>
        )}

        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Input
            type="text"
            placeholder="i.e. What is this about?"
            className="w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" disabled={!input || isPending}>
            {isPending ? "Asking..." : "Ask"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChatToDocument;
