import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { env } from "../../../env/server.mjs";

export const chatgptRouter = createTRPCRouter({
  hello: publicProcedure
    .query(() => {
      return {
        greeting: `Hello from ChatpGPT`,
      };
    }),
  sendMessage: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input }) => {
      const { content } = input;
      const configuration = new Configuration({
        apiKey: env.OPENAI_PUBLIC_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: content,
        temperature: 0.9,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      if (response.data.choices[0]?.text) {
        const text = response.data.choices[0]?.text
        console.log('response', response.data.choices[0]);
        const startOfArray = response.data.choices[0].text.indexOf('"questions')
        const testing = text.slice(startOfArray, text.length);
        console.log('testing', testing);
        try {
          const parsedResponse = JSON.parse(testing) as { questions: { id: number; content: string; typeOfQuestion: string; options?: string[] }[] };
          console.log('parsedResponse', parsedResponse);
          return parsedResponse;
        } catch (err) {
          console.log('err', err);
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Eso no era lo que esperaba. Asegurate de que tu output contenga solamente las preguntas en el formato JSON especificado anteriormente",
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            
            frequency_penalty: 0,
            presence_penalty: 0,
          })
          console.log('response CUANDO SE EQUIVOCA', response.data.choices[0]);
        }
      }
    }),
  retrieveModels: publicProcedure
    .query(async ({ }) => {
      const configuration = new Configuration({
        apiKey: env.OPENAI_PUBLIC_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const models = await openai.listModels();
      console.log('models', JSON.stringify(models));
      return models.data.data;
    })
})
