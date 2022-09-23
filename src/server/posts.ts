import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createRouter } from "./context";

export const postsRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Not Authorized" });
    }

    return next();
  })
  .query("findAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.post.findMany();
    },
  })
  .mutation("insertOne", {
    input: z.object({
      content: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session?.user.id },
      });
      if (user === null) {
        return null;
      }
      return await ctx.prisma.post.create({
        data: { content: input.content, authorId: user.id },
      });
    },
  })
  .mutation("updateOne", {
    input: z.object({
      id: z.string(),
      content: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id, ...rest } = input;

      return await ctx.prisma.post.update({
        where: { id },
        data: { ...rest },
      });
    },
  })
  .mutation("deleteAll", {
    input: z.object({
      ids: z.string().array(),
    }),
    resolve: async ({ input, ctx }) => {
      const { ids } = input;

      return await ctx.prisma.post.deleteMany({
        where: {
          id: { in: ids },
        },
      });
    },
  });

export type PostRouter = typeof postsRouter;
