import React,{  memo,useMemo,useCallback,useState,useEffect } from "react";
import { Outlet,useNavigate,useLocation } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import Header from '@/components/header/header';
import { deepMenuList } from "@/utils/index";
import _ from 'lodash';
import { Menu } from 'antd';

const LayoutMenu = memo(() => {
  const { activeMenu,menu } = useSelector((state) => state.permission)
  const [openKeys,setOpenKeys] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const items = useMemo(() => {
    let { moduleId } = activeMenu;
    let temp = []
    let _menu = _.cloneDeep(menu)
    _menu.forEach((v) => {
      if(v.moduleId === moduleId){
        temp.push(v)
      }
    })
    temp = deepMenuList(temp)
    return temp
  },[activeMenu]) 
  useEffect(() => {
    let temp = []
    temp = _.map(items,(item) => {
      return item.key
    })
    setOpenKeys(() => temp)
  },[items])
  const handleClickMenu  = useCallback((e)=>{
    navigate(e.key)
  },[])
  const handleOpenChange = useCallback((oKeys) => {
    setOpenKeys(() => oKeys)
  },[])
  return (
    <div>
      <Header></Header>
      <div className="layout-menu-content">
        <div className="layout-menu">
        <Menu
          mode="inline"
          style={{
            width: 160,
          }}
          items={items}
          openKeys={openKeys}
          selectedKeys={[location.pathname]}
          onClick={handleClickMenu}
          onOpenChange={handleOpenChange}
        />
        </div>
        <div className="layout-content">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )   
})

export default LayoutMenu;