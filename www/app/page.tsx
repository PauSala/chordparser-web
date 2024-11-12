"use client";

import { Header } from "./components/Header";
import Parser from "./components/Parser";

export default function Home() {
  return (
    <div className="flex flex-col font-roboto">
      <Header></Header>
      <Parser></Parser>
    </div>
  );
}
