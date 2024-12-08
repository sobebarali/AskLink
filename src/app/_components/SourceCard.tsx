"use client";

import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon, FileTextIcon } from "lucide-react";
import { cn } from "~/lib/utils";

type SourceCardProps = {
  pageContent: string;
  source: string;
  lines: { from: number; to: number }[];
};

export function SourceCard({ pageContent, source, lines }: SourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={cn(
        "transition-all duration-300",
        isExpanded ? "bg-muted" : "hover:bg-muted/50",
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileTextIcon className="text-muted-foreground h-5 w-5" />
            <p className="font-medium">{source}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-background"
          >
            {isExpanded ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-5 mt-4 space-y-3 duration-300">
            <div>
              <h4 className="text-muted-foreground mb-1 text-sm font-semibold">
                Content
              </h4>
              <p className="text-sm">{pageContent}</p>
            </div>
            <div>
              <h4 className="text-muted-foreground mb-1 text-sm font-semibold">
                Location
              </h4>
              <p className="text-sm">
                Lines{" "}
                {lines.map((line, idx) => (
                  <span key={idx} className="inline-flex items-center">
                    {line.from}-{line.to}
                    {idx < lines.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
