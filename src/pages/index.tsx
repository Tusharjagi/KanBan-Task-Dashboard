import Head from "next/head";
import { HomeScreen } from "@/common/screens/home";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kanban Dashboard</title>
      </Head>
      <HomeScreen />
    </>
  );
}
