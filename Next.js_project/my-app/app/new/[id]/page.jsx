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
