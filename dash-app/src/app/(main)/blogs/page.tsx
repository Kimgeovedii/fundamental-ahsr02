"use client";
import * as React from "react";
import axios from "axios";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface IBlogPageProps {}

const BlogPage: React.FunctionComponent<IBlogPageProps> = (props) => {
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_API_KEY}&pageSize=10`
      );
      console.log(res.data);
      setData(res.data.articles);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  const printData = () => {
    return data.map((value: any, index) => {
      return (
        <div
          key={`${value}, ${index})`}
          className="flex w-full max-w-md flex-col gap-6"
        >
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>{value.title}</ItemTitle>
              <ItemDescription>
                A simple item with title and description.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Link
                className="bg-slate-600 p-2 text-white rounded-lg"
                href={`/blogs/${value.title.replace(/ /g, "-")}`}
              >
                Detail
              </Link>
            </ItemActions>
          </Item>
        </div>
      );
    });
  };
  return (
    <div className="w-full p-10 flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Blog Page</h1>
      <div className="grid grid-cols-4 gap-4">{printData()}</div>
    </div>
  );
};

export default BlogPage;
