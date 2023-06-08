import { lazy,Suspense } from "react";
import { Navigate } from "react-router-dom";
import LayoutMenu from "@/components/common/LayoutMenu";
import Layout from "@/components/common/Layout";
import Page from "@/components/common/Page";

const lazyLoad = (moduleName) => {
    const Module = lazy(() => import(`@/views/${moduleName}`));
    return <Suspense><Module /></Suspense>  ;
};

const routes = [{
  path:'/',
  element: <Navigate to="/dashboard/index" />
},{
  path:'/dashboard',
  element: <Layout></Layout>,
  children: [
    {
      path:'index',
      element:lazyLoad('dashboard/index')
    }  
  ]
},{
  path:'/indicator',
  element:<Layout></Layout>,
  children:[{
    path:'index',
    element:lazyLoad('indicator/index')
  }]
},{
  path:'/biz',
  element: <Layout></Layout>,
  children:[{
    path:'overview',
    element: lazyLoad('biz/overview')
  }]
},{
  path:'/aba',
  element: <LayoutMenu></LayoutMenu>,
  children:[
    {
      path:'event',
      element:lazyLoad('aba/event/index')
    },{
      path:'retain',
      element:lazyLoad('aba/retain/index')
    },{
      path:'funnel',
      element:lazyLoad('aba/funnel/index')
    },{
      path:'user',
      element:lazyLoad('aba/user/index')
    },{
      path:'path',
      element:lazyLoad('aba/path/index')
    },{
      path:'resource',
      element:lazyLoad('aba/resource/index')
    }
  ]
},{
  path:'/app',
  element:<LayoutMenu></LayoutMenu>,
  children:[
    {
      path: 'public/dataset/list',
      element: lazyLoad('app/public/datasetList') // 公共数据集列表
    },
    {
      path: 'dataset/list',
      element: lazyLoad('app/dataset/list') // 个人数据集列表
    },
    {
      path: 'chart/list',
      element: lazyLoad('app/chart/list') // 自助图表
    },
    {
      path: 'sql/search',
      element: lazyLoad('app/sql/search') // SQL查询
    },
    {
      path: 'public/report/list',
      element: lazyLoad('app/public/reportList') // 公共报表
    },
    {
      path: 'report/list',
      element: lazyLoad('app/report/list') // 个人报表制作列表
    }    
  ]
},
{
  path: '/page',
  element: <Page></Page>,
  children: [
    {
      path: 'dataset/add',
      element: lazyLoad('page/dataset/add') // 新建数据集
    },
    {
      path: 'chart/add',
      element: lazyLoad('page/chart/add') // 自助图表
    },
    {
      path: 'report/add',
      element: lazyLoad('page/report/add') // 新建报表 
    },
    {
      path: 'report/preview',
      element: lazyLoad('page/report/preview') // 报表预览
    },
    {
      path: 'report/tabluea',
      element: lazyLoad('page/report/tabluea') // 报表预览
    },
    {
      path: 'public/report/preview',
      element: lazyLoad('page/public/reportPreview') // 公共报表预览
    },
    {
      path: 'public/report/tabluea',
      element: lazyLoad('page/public/reportTabluea') // Tabluea报表预览
    }
  ]
},
{
  path: '/ab',
  element:<LayoutMenu></LayoutMenu>,
  children: [
    {
      path: 'lab/list',
      element: lazyLoad('ab/lab/list')
    },
    {
      path: 'lab/type',
      element: lazyLoad('ab/lab/type')
    },
    {
      path: 'lab/add',
      element: lazyLoad('ab/lab/add')
    },
    {
      path: 'lab/adjust',
      element: lazyLoad('ab/lab/adjust')
    }
  ]
},
{
  path: '/sys',
  element:<LayoutMenu></LayoutMenu>,
  children: [
    {
      path: 'site/list',
      element: lazyLoad('sys/site/list')
    },
    {
      path: 'project/list',
      element: lazyLoad('sys/project/list')
    },
    {
      path: 'indicator/list',
      element: lazyLoad('sys/indicator/list')
    }
  ]
},
{
  path:'error',
  element: lazyLoad('error')
},
{
  path:'*',
  element: lazyLoad('404')
}]

export default routes