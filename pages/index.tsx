import Head from "next/head";
import { useState } from "react";
import DastCodeBlock from "../components/dast-code-block";
import Editor from "../components/editor";
import styles from "../styles/Home.module.css";
import htmlToDast from "../lib/html-to-dast";

export default function Home() {
  const [dast, setDast] = useState("{}");

  async function onUpdate(html: string) {
    console.log(html);
    const processedDast = await htmlToDast({ html });
    setDast(JSON.stringify(processedDast.dast, null, 2));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Convert HTML to DAST (DatoCMS AST)</title>
        <meta
          name="description"
          content="Convert HTML to DAST (DatoCMS AST) for use in StructuredText fields"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Convert HTML to DAST</h1>
        <Editor {...{ onUpdate }} />
        <DastCodeBlock dast={dast} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
