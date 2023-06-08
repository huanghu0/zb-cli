import { useCallback, useEffect, useState } from 'react';
import { useRoutes,useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getPermissionInfo } from '@/services/permission/index';
import { permissionAction } from '@/store/permission/permissionSlice';
import { userInfoAction } from '@/store/login/loginSlice';
import routes from '@/router/index';
import { checkPms,checkUrl,getFirstUrl } from '@/utils/index'
import '@/assets/scss/app.scss';


function App() {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const location  = useLocation()
  const [rout,setRout] = useState(routes)
  const element = useRoutes(rout)
  
  const fetchPermission =  useCallback( async () => {
    const res = await getPermissionInfo()
    const { data:{menu,module,page,project,userInfo} } = res
    dispatch(permissionAction({
      menu,
      module,
      page,
      project
    }))
    dispatch(userInfoAction({
      userInfo,
    }))

    let url = location.pathname

    if(module && module.length !== 0){
      if(url === '/' || checkPms(url,menu,dispatch) || checkUrl(url,module,page)){
        let isModuleUrl = module.find((v) => v.moduleUrl === url)
        if(url === '/'){
          const targetUrl = getFirstUrl(module?.[0] || {},menu,dispatch)
          navigator(targetUrl)
        }else if(isModuleUrl){
          getFirstUrl(isModuleUrl,menu,dispatch)
        }
      }else{
        navigator('/404')
      }
    }    

  },[])
  
  useEffect(()=>{
    fetchPermission()
  },[])

  return (
    <div className="app" id="app">
      { element }        
    </div>
  );
}

export default App;
