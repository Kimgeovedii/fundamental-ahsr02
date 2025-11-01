import * as React from "react";

export interface IDetailBlogProps {
  params: Promise<{
    title: string;
  }>;
}

const DetailBlog: React.FunctionComponent<IDetailBlogProps> = async (props) => {
  const params = await props.params;

  return (
    <div>
      <h1>Detail Pages</h1>
      <h2>{params.title}</h2>
    </div>
  );
};
export default DetailBlog;
