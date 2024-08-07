import Image from "next/image";
import styles from "./page.module.css";
import { PureTable } from "./components/Table";
import axios from "axios";
import { TableData } from "./types";

export default async function Home() {
  const response = await axios.get<TableData>("http://localhost:3000/api?page=1");

  return (
    <main className={styles.main}>
      <PureTable data={response.data} />
    </main>
  );
}
