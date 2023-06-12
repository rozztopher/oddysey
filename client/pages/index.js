import Head from "next/head";
import Hero from "../components/home/Hero";
import Story from "../components/home/Story";
import Mint from "../components/home/Mint";
import Roadmap from "../components/home/Roadmap";
import FAQs from "../components/home/FAQs";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const url = document.URL;
    if (url.includes("mint")) {
      window.scrollTo(0, 0);
    } else if (url.includes("story")) {
      setTimeout(() => {
        const sec = document.getElementById("story");
        sec.scrollIntoView(true);
      }, 1000);
    } else if (url.includes("roadmap")) {
      setTimeout(() => {
        const sec = document.getElementById("roadmap");
        sec.scrollIntoView(true);
      }, 1000);
    } else if (url.includes("faq")) {
      setTimeout(() => {
        const sec = document.getElementById("faq");
        sec.scrollIntoView(true);
      }, 1000);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="flex-column ai-center">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Story />
      <Mint />
      <Roadmap />
      <FAQs />
    </div>
  );
}
