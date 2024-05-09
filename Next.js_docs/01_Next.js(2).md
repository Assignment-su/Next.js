## Next.js

###  1. 새로운 페이지 생성하기

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



#### [공식문서] Pages and Layouts

we recommend reading the Routing Fundamentsal and Defining Routes pages before continuing.

The App Router inside Next.js 13 introduced new file conventious to easily create pages, shared layouts, and templates.

This page will guide you through how to use theses special files in your Next.js application. 

* pages와 layouts 의 차이점 

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
>   return <h1>Hello, Home page!</h1>
> }
> ```
>
> ```tsx
> // `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
> export default function Page() {
>   return <h1>Hello, Dashboard Page!</h1>
> }
> ```

##### Layouts

> A layout is UI that is **shared** between multiple routes. On navigation, layouts preserve state, remain interactive, and do not re-render. Layouts can also be [nested](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#nesting-layouts).
>
> You can define a layout by default exporting a React component from a `layout.js` file. The component should accept a `children` prop that will be populated with a child layout (if it exists) or a page during rendering.
>
> 여러페이지에서 공유할 수 있는 UI라는 의미를 가지고 있다. 공통적으로 가질 수 있는 NAVBAR 를 페이지 보다는 레이아웃의 개념으로 사용할 수 있다. 
>
> ```tsx
> export default function DashboardLayout({
>   children, // will be a page or nested layout
> }: {
>   children: React.ReactNode
> }) {
>   return (
>     <section>
>       {/* Include shared UI here e.g. a header or sidebar */}
>       <nav></nav>
>  
>       {children}
>     </section>
>   )
> }	
> ```



### 2. 동적인 페이지 만들기

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
>  ✓ Compiled in 75ms (277 modules)
> news id 12356
> searchParams { test: 'abc' }
> ```



* `params, searchParams` 을 통해서 URL 있는 정보들을 가져올 수 있다. 



### 3. 페이지 간 링크로 연결하기 

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



---



* Next.js 에서 새로운 페이지를 추가하기 위해서는 `/app` 하위 디렉토리명을 경로 명과 동일하게 작성해서 `page.jsx` 컴포넌트를 만든다. 

* 동적인 페이지를 만들 때 `params, searchParams` 등의 값을 컴포넌트 인자를 통해서 받아올 수 있다. 
* 페이지간 이동을 할 때는 Link 컴포넌트를 사용하거나 `router.page`를 통해서 할 수 있다. 
