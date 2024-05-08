## Next.js 

* 리액트를 풀스택으로 개발할 수 있는 프레임워크

  * 라이브러리 : 특정 기능 하나에 집중 (lke React)
  * 프레임워크 : 하나의 기능이 아닌 시스템 전체의 동작을 고려 (like Next.js)

* Next.js는 서버 사이드 렌더링 (Server Side Rendering)을 지원한다. 

  > also referred to as "SSR" or "Dynamic Rendering"

* 리액트에서는 별도의 router를 사용할 필요가 없다. 

  * `/pages` 디렉토리 하위에 있는 경로(path)가 그 자체로 페이지의 path가 된다. 

  * `/pages/home.tsx` => `www.example.com/home`

    > Routhing 
    >
    > The Pages Router has a file-system based router built on concepts of pages.
    >
    > When a file is added to the pates directory it's automatically available as a route.
    >
    > Learn more about routing in the Pages Router

* Next.js를 통해 백엔드 코드도 같이 작성할 수 있다. 

  `/pages/api` 하위에 Node.js 백엔드 코드를 작성하면 API를 만들 수 있다. 

  

----



* Next.js 프로젝트 시작하기 

```bash
$ npx create-next-app@latest
```



---



* next.js는 리액트를 풀스택으로 개발할 수 있는 프레임워크이다. 
* next.js의 특징으로 SSR, 파일기반 라우팅, 풀스택 애뱌 개발이 가능하다는 점이 있다. 
* next.js를 통해 SSR 방식으로 웹어플리케이션을 개발하면 초기 로드 속도가 빨라지고 SEO에 유리하다는 장점이 있다.  