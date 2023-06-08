import React,{  memo } from "react";
import { Outlet } from 'react-router-dom';

const Page = memo(() => {
  return (
    <div className="page-content">
      <Outlet></Outlet>
    </div>
  )   
})

export default Page;