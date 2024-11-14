"use client";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Introduction } from "./components/Introduction";
import Parser from "./components/Parser";

export default function Home() {
  return (
    <div className="flex flex-col font-geist pb-5">
      <Header></Header>
      <div className="text-primary font-righteous text-2xl flex p-4 items-center justify-center">
        <h1 className="font-bold bg-gradient-to-r from-warning to-success inline-block text-transparent bg-clip-text">
          ChordParser Playground
        </h1>
      </div>
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:6/12 mx-auto">
        <Introduction></Introduction>
        <Parser></Parser>
      </div>
      <Footer></Footer>
    </div>
  );
}
