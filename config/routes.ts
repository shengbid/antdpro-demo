export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: '嵌套组件',
    icon: 'table',
    path: '/project',
    component: './project',
  },
  {
    path: '/table',
    name: 'table',
    icon: 'table',
    routes: [
      {
        name: '表格合并',
        icon: 'table',
        path: '/table/spanTable',
        component: './Table/spanTable',
      },
      {
        name: 'tree表格',
        icon: 'table',
        path: '/table/treeTable',
        component: './Table/treeTable',
      },
      {
        name: '可编辑表格',
        icon: 'table',
        path: '/table/editProTable',
        component: './Table/editProTable',
      },
      {
        name: 'formitem验证表格',
        icon: 'table',
        path: '/table/validateTable',
        component: './Table/validateTable',
      },
    ],
  },
  {
    name: '产品列表',
    icon: 'BarsOutlined',
    path: '/product/list',
    component: './product/list',
  },
  // {
  //   name: 'Form表单',
  //   icon: 'FileAddOutlined',
  //   path: '/form',
  //   routes: [
  //     {
  //       name: 'debonce',
  //       icon: 'table',
  //       path: '/form/debonce',
  //       component: './Form/debounceSelect',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
