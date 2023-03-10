/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { api } from "../utils/api";
import { useEffect, useState } from "react";

type FormInput = {
  question: string;
};

const Home: NextPage = () => {
  const chatgpt = api.chatgpt.sendMessage.useMutation();
  const chatModels = api.chatgpt.retrieveModels.useQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<FormInput>();
  const [questions, setQuestions] =
    useState<{ id: string; content: string }[]>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { question } = data;
    await chatgpt.mutateAsync({ content: question });
  };
  useEffect(() => {
    console.log("chatModels", chatModels);
  }, [chatModels]);

  if (chatgpt.isLoading) {
    return <>Loading....</>;
  }

  return (
    <>
      <Head>
        <title>Ustool</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Us<span className="text-[hsl(280,100%,70%)]">Tool</span> App
          </h1>
          <div className="grid w-2/3 grid-cols-1 gap-8">
            <div className="flex flex-col gap-4 rounded-t-lg bg-white/10 p-4 text-white hover:bg-white/20">
              <h3 className="text-4xl font-bold">Pregunta →</h3>
              <form name="question" onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  {...register("question")}
                  rows={8}
                  className="mt-1 block w-full rounded-md border-gray-300 text-xl text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Hola Chat, estoy haciendo una encuesta de satisfacción. Los usuarios, son comensales de un restaurante. Mi objetivo es hacer preguntas de satisfacción de la forma más amable posible. Me tenes que hacer una pregunta por cada input:
                  Inputs:  
                  1- Lista desplegable
                  2- Checkbox
                  3- Radio button
                  4- TextArea
                  5- Puntaje del 1 al 5
                  
                  También quiero que lo único que me respondas sean solamente las 5 preguntas enumeradas, sin ninguna explicación. Me lo tenes que devolver en este formato JSON: 
                  questions: [
                    id,
                    content,
                    typeOfQuestion,
                    options?,
                  ]"
                  defaultValue={`Hola Chat, estoy haciendo una encuesta de satisfacción. Los usuarios, son comensales de un restaurante. Mi objetivo es hacer preguntas de satisfacción de la forma más amable posible. Me tenes que hacer una pregunta por cada input:
                  Inputs:  
                  1- Lista desplegable
                  2- Checkbox
                  3- Radio button
                  4- TextArea
                  5- Puntaje del 1 al 5
                  
                  También quiero que lo único que me respondas sean solamente las 5 preguntas enumeradas, sin ninguna explicación. Me lo tenes que devolver en este formato JSON: 
                  "questions": [
                    id,
                    content,
                    typeOfQuestion,
                    options?,
                  ]`}
                />
                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    className="w-1/2 rounded-md border border-transparent bg-[hsl(280,100%,70%)] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Preguntar
                  </button>
                </div>
              </form>
            </div>
            <div className="flex flex-col gap-4 rounded-b-lg bg-white/10 p-4 text-white hover:bg-white/20">
              <div className="text-right">
                <h3 className="text-4xl font-bold">← Respuesta</h3>
              </div>
              <div className="mt-1 block h-44 w-full rounded-md border-gray-300 bg-white p-2 text-xl text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <div>
                  {chatgpt.data?.questions?.map(
                    ({ id, content, options, typeOfQuestion }) => {
                      return (
                        <>
                          <div key={id}>
                            {content} - {typeOfQuestion}
                          </div>
                          {options ? (
                            <ol>
                              {options.map((option, index) => (
                                <li key={index}>{option}</li>
                              ))}
                            </ol>
                          ) : null}
                        </>
                      );
                    }
                  ) || "No hay data"}
                </div>
              </div>
              {/* <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 rounded-md border border-transparent bg-[hsl(280,100%,70%)] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Preguntar
                </button>
              </div> */}
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white">Preguntas</h2>
          <p className="text-2xl text-white">
            {questions
              ? questions?.map((question) => question.content)
              : "No se han generado❓todavía 😢 "}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
