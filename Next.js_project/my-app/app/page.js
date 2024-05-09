import Link from "next/link";
import { prisma } from "./db";

export default async function Home() {
  //간단하게 데이터 넣어주기
  // await prisma.todo.create({ data: { title: "테스트 데이터" } });
  const todos = await prisma.todo.findMany();
  console.log("todos", todos);
  return (
    <>
      <h1>Hello Next.js</h1>
      <Link href="/news">Go to News</Link>
      {/* 데이터 베이스에서 불러온 데이터들을 map을 통해 로직을 그려나갈 수 있다. */}
      {todos.map((todo) => (
        <h1>{todo.title}</h1>
      ))}
    </>
  );
}
