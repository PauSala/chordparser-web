"use client";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Introduction } from "./components/Introduction";
import Parser from "./components/Parser";

export default function Home() {
  return (
    <div className="flex flex-col font-geist">
      <Header></Header>
      <div className="text-primary font-righteous text-2xl flex p-4 items-center justify-center">
        <h1 className="font-bold bg-gradient-to-r from-warning to-success inline-block text-transparent bg-clip-text">
          ChordParser Playground
        </h1>
      </div>
      <Introduction></Introduction>
      <Parser></Parser>
      <Footer></Footer>
    </div>
  );
}
