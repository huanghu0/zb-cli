export default {
  permsResult: {
    module: [
      {
        moduleDesc: "",
        moduleName: "图形功能",
        oid: "4001",
        projectId: "40",
      },
    ],
    menu: [
      {
        oid: "400101",
        menuName: "图数据查询",
        menuDesc: "",
        parentId: null,
        moduleId: "4001",
        icon: "",
        menuUrl: "/graph/data-query",
        orderBy: 1,
        level: 0,
        children: [
          {
            oid: "400102",
            menuName: "图数据查询",
            menuDesc: "",
            parentId: "400101",
            moduleId: "4001",
            icon: "",
            menuUrl: "/graph/data-query/index",
            orderBy: 1,
            level: 1,
            children: [],
          },
          {
            oid: "400103",
            menuName: " 查询模板配置",
            menuDesc: "",
            parentId: "400101",
            moduleId: "4001",
            icon: "",
            menuUrl: "/graph/data-query/module-config",
            orderBy: 1,
            level: 1,
            children: [],
          },
        ],
      },
    ],
    page: [
      {
        menuId: "400102",
        oid: "40010201",
        pageDesc: "",
        pageName: "图数据查询",
        pageUrl: "/graph/data-query/index",
      },
      {
        menuId: "400103",
        oid: "40010301",
        pageDesc: "",
        pageName: "查询模板配置",
        pageUrl: "/graph/data-query/module-config",
      },
    ],
  },
};
