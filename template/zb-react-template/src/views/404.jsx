import React,{  memo } from "react";
import { Empty } from "antd";
import Header from '@/components/header/header';

const NotFound = memo(() => {
  return (
    <div>
      <Header></Header>
      <Empty></Empty>  
    </div>
  )  
})

export default NotFound;