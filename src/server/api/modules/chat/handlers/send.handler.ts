import type {
  typeResult,
  typeResultData,
  typeResultError,
} from "../types/send.types";
import Logging from "~/utils/logging";

import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableMap,
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import type { Document } from "@langchain/core/documents";

export default async function sendChat(
  { link, question }: { link: string; question: string },
  requestId: string,
): Promise<typeResult> {
  let data: typeResultData | null = null;
  let error: typeResultError | null = null;

  try {
    Logging.info(`${requestId} [CHAT] - SEND handler started`);

    const loader = new CheerioWebBaseLoader(link);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splits = await textSplitter.splitDocuments(docs);
    const vectorStore = await MemoryVectorStore.fromDocuments(
      splits,
      new OpenAIEmbeddings(),
    );

    const retriever = vectorStore.asRetriever();

    const customTemplate = `Use the following pieces of context to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    Use three sentences maximum and keep the answer as concise as possible.

    {context}

    Question: {question}

    Helpful Answer:`;

    const customRagPrompt = PromptTemplate.fromTemplate(customTemplate);
    const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });

    const ragChainWithSources = RunnableMap.from({
      context: retriever,
      question: new RunnablePassthrough(),
    }).assign({
      answer: RunnableSequence.from([
        (input) => {
          return {
            context: formatDocumentsAsString(input.context as Document[]),
            question: input.question,
          };
        },
        customRagPrompt,
        llm,
        new StringOutputParser(),
      ]),
    });

    const result = await ragChainWithSources.invoke(question);

    let sources: {
      pageContent: string;
      metadata: {
        source: string;
        loc: {
          lines: {
            from: number;
            to: number;
          }[];
        };
      };
    }[] = [];

    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    result.context.forEach((source: Document) => {
      const loc = source.metadata.loc;

      // Ensure loc.lines is an array of objects with from and to properties
      const linesArray = Array.isArray(loc.lines) ? loc.lines : [loc.lines];

      sources.push({
        pageContent: source.pageContent,
        metadata: {
          source: source.metadata.source,
          loc: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            lines: linesArray.map((line: { from: number; to: number }) => ({
              from: line.from,
              to: line.to,
            })),
          },
        },
      });
    });

    // Remove duplicates
    sources = sources.filter(
      (value, index, self) => self.indexOf(value) === index,
    );

    data = {
      answer: result.answer,
      question: question,
      sources: sources,
    };

    Logging.info(`${requestId} [CHAT] - SEND handler completed successfully`);
  } catch (err: any) {
    Logging.error(`${requestId} [CHAT] - SEND handler error ${err}`);
    error = {
      code: err.errorCode || "UNEXPECTED_ERROR",
      message: err.message || "An unexpected error occurred",
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
