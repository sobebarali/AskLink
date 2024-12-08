import { expect, it } from "vitest";
import { appRouter, type RouterInputs, type RouterOutputs } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

it("unauthed user should not be possible to send a chat", async () => {
  const ctx = await createTRPCContext({ headers: new Headers() });
  const caller = appRouter.createCaller(ctx);

  const input: RouterInputs["chat"]["send"] = {
    link: "https://lilianweng.github.io/posts/2023-06-23-agent/",
    question: "What is task decomposition?"
  };

  const res: RouterOutputs["chat"]["send"] = await caller.chat.send(input);

  console.log("res:", res.data);

  const expectedResponse: RouterOutputs["chat"]["send"] = {
    data: {
      question: input.question,
      answer: expect.any(String),
      sources: expect.any(Array),
    },
    error: null
  };

  expect(res).toEqual(expectedResponse);
});
  