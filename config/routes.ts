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
    hideInMenu: true,
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    name: '全局数据流',
    icon: 'profile',
    path: '/data',
    routes: [
      {
        name: 'dva数据',
        icon: 'table',
        path: '/data/dva',
        component: './dataManage/project',
      },
      {
        name: 'initial数据',
        icon: 'table',
        path: '/data/initialstate',
        component: './dataManage/initialstate',
      },
      {
        name: 'useModel数据',
        icon: 'table',
        path: '/data/useModel',
        component: './dataManage/useModel',
      },
    ]
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
        routes: [
          {
            path: '/table/editProTable',
            redirect: '/table/editProTable/data'
          },
          {
            name: '可编辑表格',
            icon: 'table',
            path: '/table/editProTable/data',
            component: './editTable/editProTable',
          },
          {
            name: 'formitem验证表格',
            icon: 'table',
            path: '/table/editProTable/validate',
            component: './editTable/validateTable',
          },
          {
            name: '自定义编辑表格',
            icon: 'table',
            path: '/table/editProTable/custom',
            component: './editTable/customTable',
          }, 
        ]
      },
      {
        name: 'select表格',
        icon: 'table',
        path: '/table/select',
        component: './Table/selectTable',
      },
    ],
  },
  {
    path: '/form',
    name: 'form表单',
    icon: 'BarsOutlined',
    routes: [
      {
        name: 'upload上传',
        icon: 'table',
        path: '/form/upload',
        component: './form/upload',
      },
    ]
  },
  {
    path: '/editor',
    name: '富文本编辑',
    icon: 'BarsOutlined',
    routes: [
      {
        name: '新增',
        icon: 'table',
        path: '/editor/add',
        component: './editor/add',
      },
      {
        name: '列表',
        icon: 'table',
        path: '/editor/list',
        component: './editor/list',
      },
    ]
  },
  {
    name: '产品列表',
    icon: 'BarsOutlined',
    path: '/product/list',
    component: './product/list',
  },
  {
    name: 'Form表单',
    icon: 'form',
    path: '/form',
    routes: [
      {
        path: '/form',
        redirect: '/form/add'
      },
      {
        name: 'form表单',
        icon: 'table',
        path: '/form/add',
        component: './product/addProduct',
      },
      {
        name: 'debonceselect',
        icon: 'table',
        path: '/form/debonceselect',
        component: './form/debounce',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
