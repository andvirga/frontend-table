import Image from "next/image";
import styles from "./page.module.css";
import { HTMLTable } from "./components/HTMLTable";
import axios from "axios";
import { TableData } from "./types";

export default async function Home() {
  const response = await axios.get<TableData>(
    "http://localhost:3000/api?page=1"
  );

  return (
    <main className={styles.main}>
      <HTMLTable data={response.data} />
    </main>
  );
}
