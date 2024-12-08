"use client";

import { LinkQuestionForm } from "~/app/_components/LinkQuestionForm";
import { ThemeProvider } from "~/app/_components/theme-provider";
import { GlobeIcon, SearchCodeIcon } from "lucide-react";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="from-background/90 to-background min-h-screen bg-gradient-to-b">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex items-center space-x-4">
              <GlobeIcon className="text-primary h-12 w-12 animate-pulse" />
              <SearchCodeIcon className="text-primary h-12 w-12 animate-pulse" />
            </div>

            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Ask Anything About
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {" "}
                  Your Link
                </span>
              </h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
                Paste any URL and ask questions about its content. Get instant,
                AI-powered answers with source references.
              </p>
            </div>

            <div className="w-full max-w-3xl">
              <LinkQuestionForm />
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
