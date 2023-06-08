import React,{  memo } from "react";
import { Outlet } from 'react-router-dom';
import Header from '@/components/header/header';

const Layout = memo(() => {
  return (
    <div>
      <Header></Header>
      <div className="layout-content">
        <Outlet></Outlet>
      </div>
    </div>
  )   
})

export default Layout;