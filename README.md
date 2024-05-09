# 🦠 Next.js
### About Next.js
🟢 리액트를 풀스택으로 개발할 수 있는 프레임워크

    * 라이브러리 : 특정 기능 하나에 집중 (lke React)
    * 프레임워크 : 하나의 기능이 아닌 시스템 전체의 동작을 고려 (like Next.js)

🟢 Next.js는 서버 사이드 렌더링 (Server Side Rendering)을 지원한다.

> also referred to as "SSR" or "Dynamic Rendering"
> 리액트에서는 별도의 router를 사용할 필요가 없다.
> 
> `/pages` 디렉토리 하위에 있는 경로(path)가 그 자체로 페이지의 path가 된다.
>
> `/pages/home.tsx => www.example.com/home`

    Routhing

    The Pages Router has a file-system based router built on concepts of pages.

    When a file is added to the pates directory it's automatically available as a route.

    Learn more about routing in the Pages Router

🟢 Next.js를 통해 백엔드 코드도 같이 작성할 수 있다.
> `/pages/api` 하위에 Node.js 백엔드 코드를 작성하면 API를 만들 수 있다.

</br>

---

</br>

### 1. Next.js 프로젝트 시작하기
```bash
$ npx create-next-app@latest
```

</br>

### 2. 새로운 페이지 생성하기 

* `/app` 하위에 디렉토리를 만들어서 그 하위에 `/page.jsx` 컴포넌트를 만들면 중첩된 경로를 가진 페이지를 만들 수 있다. 
  * `/app/AAA/page.jsx` => `www.example.com/AAA`

(1) `app > news > page.jsx` 생성하기

```react
//기본적인 템플릿
import React from "react";

const News = () => {
  return <div>Hello News</div>;
};

export default News;
```

> `localhost:3000/news`

따로 라우트 처리 해줄 필요없이 path에 맞춰서 컴포넌트를 만들어주면 된다. 

</br>

* `localhost:3000/news/articles`

```react
import React from 'react';

const Articles = () => {
    return (
    	<div>
        	Hello articles
        </div>
    );
};
export default Articles;
```

> `app` > `news` > `articles` > `page.jsx`

</br>

#### [공식문서] Pages and Layouts

we recommend reading the Routing Fundamentsal and Defining Routes pages before continuing.

The App Router inside Next.js 13 introduced new file conventious to easily create pages, shared layouts, and templates.

This page will guide you through how to use theses special files in your Next.js application. 

* pages와 layouts 의 차이점 

</br>

##### Pages

> A page is UI that is uique to a route.
>
> You can define pages by exporting a component from a `page.js` file.
>
> Use nested folders to define a route and a `page.js` file to make the route publicly accessible.
>
> 페이지는 사용자 인터페이스인데 라우트의 고유한 값을 가진 경로이다. (하나의 라우트에 하나씩 고유하게 할당된 UI 페이지)
>
> ```tsx
> // `app/page.tsx` is the UI for the `/` URL
> export default function Page() {
> return <h1>Hello, Home page!</h1>
> }
> ```
>
> ```tsx
> // `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
> export default function Page() {
> return <h1>Hello, Dashboard Page!</h1>
> }
> ```

</br>

##### Layouts

> A layout is UI that is **shared** between multiple routes. On navigation, layouts preserve state, remain interactive, and do not re-render. Layouts can also be [nested](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#nesting-layouts).
>
> You can define a layout by default exporting a React component from a `layout.js` file. The component should accept a `children` prop that will be populated with a child layout (if it exists) or a page during rendering.
>
> 여러페이지에서 공유할 수 있는 UI라는 의미를 가지고 있다. 공통적으로 가질 수 있는 NAVBAR 를 페이지 보다는 레이아웃의 개념으로 사용할 수 있다. 
>
> ```tsx
> export default function DashboardLayout({
> children, // will be a page or nested layout
> }: {
> children: React.ReactNode
> }) {
> return (
>  <section>
>    {/* Include shared UI here e.g. a header or sidebar */}
>    <nav></nav>
> 
>    {children}
>  </section>
> )
> }	
> ```


</br>

### 3. 동적인 페이지 만들기

* 파일 명을 `[id].jsx` 이렇게 만들어 주게 되면, id 값(파라미터 값)을 받아 동적인 페이지를 만들어 줄 수 있다. 
  * `/app.news/[id]/page.jsx` => `www.example.com/news/123`
  * 컴포넌트 props로 params, searchParams 전달받기 

```react
//app\new\[id]\page.jsx
import React from "react";

const NewsIdPage = ({ params }) => {
  console.log("news id", params.id);
  return <div> hello new {params.id}</div>;
};

export default NewsIdPage;
```

> ` hello new 123` => `http://localhost:3000/new/123`
>
> ` hello new 12356` => `http://localhost:3000/new/12356`

* 지금 만들고 있는 페이지는 클라이언트에서 렌더링하는 것이 아닌 서버에서 렌더링을 하고 있는 것이다. 그렇기 때문에 브라우저 콘솔창은 클라이언트 렌더링을 할 때 보여지는 콘솔 창이다. 



```react
import React from "react";

const NewsIdPage = ({ params, searchParams }) => {
  console.log("news id", params.id);
  console.log("searchParams", searchParams);
  return <div> hello new {params.id}</div>;
};

export default NewsIdPage;
```

</br>

`http://localhost:3000/new/12356?test=abc`

```bash
news id 12356
searchParams {}
 GET /new/12356 200 in 93ms
news id 12356
searchParams { test: 'abc' }
 GET /new/12356?test=abc 200 in 82ms
```

> `{ test: 'abc' `  은  `?` 다음에 만든 **쿼리 스트링** 이다.
>
> key, value 형태로 어떤 값들을 URL을 통해서 전달하고 싶을 때 사용하는 것이 바로 쿼리 스트링이다. 
>
> 쿼리 스트링 값을 컴포넌트에서 `searchParams` 을 통해서 가져올 수 있다. 



```react
import React from "react";

const NewsIdPage = ({ params, searchParams }) => {
  console.log("news id", params.id);
  console.log("searchParams", searchParams);
  return (
    <div>
      hello new {params.id}
      hello new {searchParams.test}
    </div>
  );
};

export default NewsIdPage;
```

> 화면에 보여지는 결과값 : hello new 12356hello new abc
>
> ```bash
> ✓ Compiled in 75ms (277 modules)
> news id 12356
> searchParams { test: 'abc' }
> ```



* `params, searchParams` 을 통해서 URL 있는 정보들을 가져올 수 있다. 

</br>

### 4. 페이지 간 링크로 연결하기 

* import Link form next/link
  * `<Link href="/path">`

```react
//Next.js_project\my-app\app\page.js
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
```



* useRouter를 사용하고 싶다면 어떻게 해야할까? 

</br>

---

</br>

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

</br>

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

</br>

#### Rendering 렌더링

> 렌더링은 작성한 코드가 사용자 인터페이스로 전환시켜주는 것이다. 

> 렌더링의 환경은 크게 Client와 Server 두 타입으로 나눠져서 설명이 가능하다. 
>
> *  Client 렌더링 : 디바이스에 있는 브라우저가 서버 요청을 보내고 응답을 받아서 UI를 그려주는 방식
> *  Server 렌더링 : 컴퓨터가 우리들의 코드에서 데이터를 저장을 하고 있고 클라이언트로부터 요청을 받았을 때 그 연산을 어플리케이션 내에서 처리를 해서 데이터를 받아 응답을 주는 방식 
>    * 해당 서버안에서 이미 데이터 응답 요청을 다 처리할 수 있다. 



---



#### Data Fetching 데이터 패칭

> 서버 컴포넌트를 통해서 서버에서 데이터 패칭을 한다. 여러개의 데이터들을 동시에 받아올 수 있도록 데이터 패칭을 할 수 있다. 
>
> 폭포수 처럼 연쇄적으로 일어나면서 로딩타임이 길어지는 일들을 최소화한다. 
>
> 요청을 트리 형태로 복제를 한다. 화면을 로딩하는 과정에서 Streaming and Susepense를 통해서 페이지를 렌더링을 한다. (사용자들에게 빠르게 화면을 보여질 수 있도록 )










