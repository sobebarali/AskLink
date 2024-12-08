import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { postRouter } from "~/server/api/routers/post";
import { chatRouter } from "~/server/api/routers/chat";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

export type RouterInputs = inferRouterInputs<typeof appRouter>;
export type RouterOutputs = inferRouterOutputs<typeof appRouter>; 
