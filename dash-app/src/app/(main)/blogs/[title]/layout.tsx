import { Metadata } from "next";
import * as React from "react";

interface IDetailLayoutProps {
  children: React.ReactNode;
}
type PropsParams = {
  params: Promise<{
    title: string;
  }>;
};
export async function generateMetadata(props: PropsParams): Promise<Metadata> {
  const title = (await props.params).title;

  return {
    title: `Dash App | ${decodeURIComponent(title)}`,
    description: title,
  };
}
const DetailLayout: React.FunctionComponent<IDetailLayoutProps> = (props) => {
  return <div>{props.children}</div>;
};

export default DetailLayout;
