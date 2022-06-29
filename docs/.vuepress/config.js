const {
  defaultTheme
} = require('vuepress')
// const { docsearchPlugin } = require('@vuepress/plugin-docsearch')

module.exports = {
  lang: 'zh-CN',
  // 左上角标题
  title: 'PYPARA',
  base: '/',
  description: '个人记录',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }]
  ],
  theme: defaultTheme({
    home: '/',
    navbar: [{
        text: 'Home',
        link: '/'
      },
      {
        text: 'Learn',
        link: '/learn/'
      },
      {
        text: 'Reading',
        link: '/reading/'
      },
      {
        text: 'Blog',
        link: '/blog/'
      },
      {
        text: 'Notes',
        link: '/notes/'
      },
      // {
      //   text: 'Interview',
      //   link: '/interview/'
      // },

      // {
      //   text: 'Group',
      //   children: ['/blog/Promise.md', '/blog/正则表达式.md']
      // },
      // {
      //   text: 'Group',
      //   children: [{
      //       text: 'SubGroup',
      //       children: ['/blog/Promise.md', '/blog/正则表达式.md'],
      //     },
      //     {
      //       text: 'SubGroup2',
      //       children: ['/blog/Promise.md', '/blog/正则表达式.md'],
      //     },
      //   ],
      // },
      {
        text: 'GitHub',
        link: 'https://github.com/PYPARA'
      },
    ],
    // 左上角标题logo
    // 路径已 Public 为根目录，或者为 URL 路径
    // logo: 'home.jpeg',


    // 侧边栏
    sidebar: {
      '/blog/': [{
        text: 'Blog',
        link: '/blog/',
        collapsible: true,
        children: [
          {
            text: '简介',
            link: '/blog/'
          },
          'Promise',
          '正则表达式'
        ]
      },],
      '/learn/': [{
        text: 'Effective-JavaScript',
        // link: '/learn/Effective-JavaScript/',
        // 不设置 link 会有伸缩标志可伸缩
        collapsible: true,
        children: [
          '/learn/Effective-JavaScript/Chapter1-Accustoming_Yourself_to_JavaScript',
          '/learn/Effective-JavaScript/Chapter2-Variable_Scope',
          '/learn/Effective-JavaScript/Chapter3-Working_with_Functions',
          '/learn/Effective-JavaScript/Chapter4-Objects_and_Prototypes'
        ],
      },{
        text: 'JavaScript高级程序设计',
        // link: '/learn/JavaScript高级程序设计/',
        collapsible: true,
        children: [
          '/learn/JavaScript高级程序设计/1-什么是JavaScript',
          '/learn/JavaScript高级程序设计/2-HTML中的JavaScript',
          '/learn/JavaScript高级程序设计/3-语言基础',
          '/learn/JavaScript高级程序设计/4-变量、作用域与内存',
          '/learn/JavaScript高级程序设计/5-基本引用类型',
          '/learn/JavaScript高级程序设计/6-集合引用类型',
          '/learn/JavaScript高级程序设计/7-迭代器与生成器',
          '/learn/JavaScript高级程序设计/8-对象、类与面向对象编程',
          '/learn/JavaScript高级程序设计/9-代理与反射',
          '/learn/JavaScript高级程序设计/10-函数',
          '/learn/JavaScript高级程序设计/11-期约与异步函数',
          '/learn/JavaScript高级程序设计/12-BOM',
          '/learn/JavaScript高级程序设计/13-客户端检测',
          '/learn/JavaScript高级程序设计/14-DOM',
          '/learn/JavaScript高级程序设计/15-DOM扩展',
        ]
      },{
        text: 'JavaScript',
        collapsible: true,
        children: [
          '/learn/JavaScript/0-JavaScript继承机制',
        ]
      }]

    },
    // 侧边栏深度
    // 可以通过 Formatter 自定义每个页面的深度
    // 页面中使用 --- xxx: xxx  --- 来配置
    sidebarDepth: 1,

  }),
  plugins: [
    // docsearchPlugin({
    //   // 配置项
    // }),
  ],
}