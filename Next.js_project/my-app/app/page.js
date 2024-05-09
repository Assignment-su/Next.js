import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hello Next.js</h1>
      <Link href="/news">Go to News</Link>
    </>
  );
}
