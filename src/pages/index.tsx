import { type NextPage } from "next";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";

import { api } from "../utils/api";
import { useState } from "react";
import Form from "../components/Form";

const Home: NextPage = () => {
  const greeting = api.chatgpt.hello.useQuery();
  const form = useForm<any>();
  const [questions, setQuestions] =
    useState<{ id: string; content: string }[]>();

  const onSubmitForm: SubmitHandler<any> = (input) => {
    console.log("input", input);
  };
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
              <Form form={form} onSubmitForm={onSubmitForm}>
                <textarea
                  {...form.register("question")}
                  rows={8}
                  className="mt-1 block w-full rounded-md border-gray-300 text-xl text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Hola Chat, estoy haciendo una encuesta de satisfacción. Los usuarios, son comensales de un restaurante. Mi objetivo es hacer 5 preguntas de satisfacción de la forma más amable posible"
                  defaultValue={
                    "Hola Chat, estoy haciendo una encuesta de satisfacción. Los usuarios, son comensales de un restaurante. Mi objetivo es hacer 5 preguntas de satisfacción de la forma más amable posible"
                  }
                />
              </Form>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 rounded-md border border-transparent bg-[hsl(280,100%,70%)] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Preguntar
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-lg bg-white/10 p-4 text-white hover:bg-white/20">
              <div className="text-right">
                <h3 className="text-4xl font-bold">← Respuesta</h3>
              </div>
              <div className="mt-1 block h-44 w-full rounded-md border-gray-300 bg-white p-2 text-xl text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                Respuesta...
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
