import React from "react";
import ProgressBar from "./widgets/ProgressBar";

type Props ={
    children: React.ReactNode
}
const Layout = ({children}: Props) => {
  return (
    <>
      <ProgressBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
