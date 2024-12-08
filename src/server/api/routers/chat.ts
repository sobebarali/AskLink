import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { typePayload, typeResult } from "~/server/api/modules/chat/types/send.types";
import sendSchema from "~/server/api/modules/chat/validators/send.validator";
import sendChat from "~/server/api/modules/chat/handlers/send.handler";

export const chatRouter = createTRPCRouter({
  send: publicProcedure.input(sendSchema).mutation(async ({ input, ctx }: { input: typePayload, ctx: { requestId: string } }): Promise<typeResult> => {
    const { requestId } = ctx;

    console.log(`Request ID: ${requestId}`);

    const { data, error } = await sendChat(input, requestId);
    
    return {
      data,
      error,
    };
  }),
});
