import Link from "next/link";
import React from "react";

const News = () => {
  return (
    <div>
      <h1>Hello News</h1>
      <Link href="/news">Go to News</Link>
    </div>
  );
};

export default News;
