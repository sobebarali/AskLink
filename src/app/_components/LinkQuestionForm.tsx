"use client";

import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { LinkIcon, SendIcon } from "lucide-react";
import { SourceCard } from "./SourceCard";
import { useToast } from "~/hooks/use-toast";
import type { typeResultData } from "~/server/api/modules/chat/types/send.types";
import { api } from "~/trpc/react";

export function LinkQuestionForm() {
  const [link, setLink] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<typeResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const utils = api.useUtils();

  const sendChat = api.chat.send.useMutation({
    onSuccess: async (data) => {
      setResponse(data.data);
      toast({
        title: "Response received",
        description: "Your question has been answered successfully.",
      });
      await utils.chat.invalidate();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!link || !question) {
      toast({
        title: "Validation Error",
        description: "Please provide both a link and a question.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    sendChat.mutate({ link, question });
  };

  return (
    <Card className="w-full p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <LinkIcon className="text-muted-foreground absolute left-3 top-3 h-5 w-5" />
            <Input
              type="url"
              placeholder="Enter a URL..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="pl-10"
            />
          </div>
          <Input
            type="text"
            placeholder="What would you like to know about this content?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <SendIcon className="h-4 w-4" />
              <span>Ask Question</span>
            </div>
          )}
        </Button>
      </form>

      {response && (
        <div className="animate-in fade-in-50 mt-8 space-y-6 duration-500">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Your Question</h3>
            <p className="text-muted-foreground">{response.question}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Answer</h3>
            <p className="text-muted-foreground">{response.answer}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sources</h3>
            <div className="grid gap-4">
              {response.sources.map((source, index) => (
                <SourceCard
                  key={index}
                  pageContent={source.pageContent}
                  source={source.metadata.source}
                  lines={source.metadata.loc.lines}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
