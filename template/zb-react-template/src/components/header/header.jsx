import React,{ memo,useCallback,useEffect,useRef,useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { useLocation,useNavigate  } from 'react-router-dom'; 
import { setActiveMenu } from '@/store/permission/permissionSlice';
import { QuestionCircleFilled,CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import { Tooltip,Dropdown  } from 'antd';

const Header = memo(() => {
  const [moduleList,setModuleList] = useState([]); // 
  const dispatch = useDispatch();
  const { module,activeMenu,menu } = useSelector((state) => state.permission)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    setModuleList(() => module)
  },[module])

  useEffect(()=> {
    if(['/401','/404','/error'].includes(location.pathname)){
      dispatch(setActiveMenu({
        activeMenu:{}
      }))
    }
  },[location])



  const handleClickModule =  useCallback((m)=>{
    let temp = []
    menu.forEach((v) => {
      if(v.moduleId === m.oid){
        temp.push(v)
      }
    })
    if(temp.length > 0){
      dispatch(setActiveMenu({
        activeMenu:temp?.[0]?.children?.[0] || {}        
      }))
      navigate(`${temp[0].children[0].menuUrl}`)
    }else{
      dispatch(setActiveMenu({
        activeMenu:{...m,moduleId:m.oid}
      }))
      navigate(`${m.moduleUrl}`)
    }

  },[menu])

  const outItems = [{
    key:'1',
    label:(
      <span>退出</span>
    )
  }]

  return (<>
    <div className="header">
      <div className='logo'>
        <img src={require('@/assets/img/logo.png')} />
        <h1>XXXXXXXX平台</h1>
      </div>
      <nav className="nav">
       {
        moduleList.map((menu) => {
          return (
            <span className={`menu-item ${menu.oid === activeMenu.moduleId ? 'active-menu':''}`} key={menu.oid}  onClick={() => handleClickModule(menu)}>
              { menu.moduleName }
            </span>
          )
        })
       }
      </nav>
      {/* <Tooltip placement="bottom" title='用户手册'>
        <div className="help">
          <a href="https://oa-pan.eastmoney.com/ddwiki/space/doc?spaceId=6749&fileUuid=4bf36e33-adb6-4a9a-aaea-b97717b3c4a3" target="_blank">
            <span className='fa'>
              <QuestionCircleFilled style={{fontSize: '20px',color: '#ccc'}}></QuestionCircleFilled>
            </span>
          </a>
        </div>
      </Tooltip> */}
      <div className="user">
        <img src={require('@/assets/img/head.png')} />
        <Dropdown
          menu={{
            items:outItems,
          }}
          trigger={['click']}
          placement="bottom"
        >
          <div className="user-dropdown">
            <span>admin</span>
            <CaretUpFilled></CaretUpFilled>          
          </div>
        </Dropdown>
      </div>
    </div>
  </>)
}) 

export default Header