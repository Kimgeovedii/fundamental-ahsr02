import * as React from "react";

interface ILoadingDetailProps {}

const LoadingDetail: React.FunctionComponent<ILoadingDetailProps> = (props) => {
  return (
    <div>
      <h1 className="text-4xl">Detail Page Loading</h1>
      <div className="h-4 bg-slate-400 w-3/4 shadow animate-pulse my-3"></div>
      <div className="h-4 bg-red-400 shadow animate-pulse w-full max-w-xl rounded" />
    </div>
  );
};

export default LoadingDetail;
