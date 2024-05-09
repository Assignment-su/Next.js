## Next.js

### 1. 서버 및 데이터베이스 셋업

```bash
$ npm i prisma -save-dev
```

```bash
$ npx prisma init --datasource-provider sqlite
```

```scheme
model Todo {
  id String @id @default(uuid())
  title String
}
```

```bash
$ npx prisma migrate dev --name init
```

```bash
migrations/
  └─ 20240509010404_init/
    └─ migration.sql
```

```javascript
//app\db.js
//db.js 파일 생성하기

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

```





### 2. 서버 컴포넌트 데이터 패칭하기 

> * 로컬 DB에서 데이터 불러오기 
> * 데이터를 넣어보기 
> * 콘솔에 찍어보기 
> * UI로 그려보기 



```react
import Link from "next/link";
import { prisma } from "./db";

export default async function Home() {
  //간단하게 데이터 넣어주기
  await prisma.todo.create({ data: { title: "테스트 데이터" } });
  const todos = await prisma.todo.findMany();
  console.log("todos", todos);
  return (
    <>
      <h1>Hello Next.js</h1>
      <Link href="/news">Go to News</Link>
    </>
  );
}
```

```bash
 ✓ Compiled in 253ms (312 modules)
todos [
  { id: 'f9aa9947-5de2-4ed9-9529-0475b4d232b7', title: '테스트 데이터' },
  { id: 'd49dd681-83f5-4560-82ce-c1628a30e28b', title: '테스트 데이터' },
  { id: 'c22f11ab-6df1-45a0-862d-6f8398a0c82a', title: '테스트 데이터' },
  { id: '8466642b-acd4-4ddf-ba12-d753cfe7bc3e', title: '테스트 데이터' }
]
 GET / 200 in 210ms
```

> * 여러개가 들어가는 이유 : 컴포넌트를 로딩할 때마다 `create` 로직이 실행이 되기 때문에 그때마다 하나씩 계속 쌓이기 때문이다. 



```react
import Link from "next/link";
import { prisma } from "./db";

export default async function Home() {
  //간단하게 데이터 넣어주기
  //await prisma.todo.create({ data: { title: "테스트 데이터" } });
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
```

> ```bash
> //화면에 보이는 결과값 
> 
> Hello Next.js
> Go to News
> 테스트 데이터
> 테스트 데이터
> 테스트 데이터
> 테스트 데이터
> ```

> state가 아니라 데이터베이스에서 값을 불러오기 때문에 새로고침을 해도 데이터베이스 값이 그대로 남아있게 된다. 
>
> 만약 `await prisma.todo.create({ data: { title: "테스트 데이터" } });` create 로직을 추가해주면 컴포넌트가 렌더링 될 때마다 하나씩 추가가 되는 것을 볼 수 있다. 



##### ⭐ 서버사이드 컴포넌트에서 데이터 패칭을 어떻게 하는지 흐름 기억하기 



---



#### Rendering 렌더링

> 렌더링은 작성한 코드가 사용자 인터페이스로 전환시켜주는 것이다. 

> 렌더링의 환경은 크게 Client와 Server 두 타입으로 나눠져서 설명이 가능하다. 
>
> *  Client 렌더링 : 디바이스에 있는 브라우저가 서버 요청을 보내고 응답을 받아서 UI를 그려주는 방식
> * Server 렌더링 : 컴퓨터가 우리들의 코드에서 데이터를 저장을 하고 있고 클라이언트로부터 요청을 받았을 때 그 연산을 어플리케이션 내에서 처리를 해서 데이터를 받아 응답을 주는 방식 
>   * 해당 서버안에서 이미 데이터 응답 요청을 다 처리할 수 있다. 



---



#### Data Fetching 데이터 패칭

> 서버 컴포넌트를 통해서 서버에서 데이터 패칭을 한다. 여러개의 데이터들을 동시에 받아올 수 있도록 데이터 패칭을 할 수 있다. 
>
> 폭포수 처럼 연쇄적으로 일어나면서 로딩타임이 길어지는 일들을 최소화한다. 
>
> 요청을 트리 형태로 복제를 한다. 화면을 로딩하는 과정에서 Streaming and Susepense를 통해서 페이지를 렌더링을 한다. (사용자들에게 빠르게 화면을 보여질 수 있도록 )



---



* Next.js를 통해 간단한 벡엔드 API와 DB를 만들어서 풀스택 어플리케이션을 만들어 볼 수 있다. 
* 서버 컴포넌트에서 데이터 패칭을 할 때 다양한 방법에 대해서 정적/동적, 패칭/캐싱 등 학습하자. 
