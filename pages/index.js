import Head from "next/head";
import Contact from "../components/Contact";
import Header from "../components/Header";
import Main from "../components/Main";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jeremiah | Frontend Web Developer</title>
        <meta name="description" content="Jeremiah Schmid's Portfolio" />
        <meta
          name="keywords"
          content="Web, Developer, HTML, CSS, React, Next.js, Firebase, Javascript, TailwindCSS, Tailwind, Node.js, Node, GraphQL"
        />
        <meta name="author" content="Jeremiah Schmid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
