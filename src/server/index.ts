import { createRouter } from "./context";
import superjson from "superjson";
import { postsRouter } from "./posts";
import { authRouter } from "./auth";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("posts", postsRouter)
  .merge("auth", authRouter);

export type AppRouter = typeof appRouter;
