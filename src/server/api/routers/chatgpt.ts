import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const chatgptRouter = createTRPCRouter({
  hello: publicProcedure
    .query(() => {
      return {
        greeting: `Hello from ChatpGPT`,
      };
    }),
});
