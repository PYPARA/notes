const base = process.argv.indexOf('--base') > -1 ? process.argv[process.argv.indexOf('--base') + 1] : '/'

export default {
  title: 'PYPARA',
  description: '个人记录',
  lastUpdated: true,
  base: base,

  themeConfig: {
    footer: {
      message: 'Powered by Vitepress',
      copyright: 'Copyright © PYPARA'
    },
    socialLinks: [{
      icon: 'github',
      link: 'https://github.com/PYPARA'
    }],
    // logo: '/public/home.jpeg',

    nav: nav(),

    sidebar: {
      '/blog/': sidebarBlog(),
      '/learn/': sidebarLearn(),
      '/notes/': sidebarNotes(),
      '/reading/': sidebarReading(),
    },
  }
}

function nav() {
  return [{
      text: 'Learn',
      link: '/learn/introduction',
      activeMatch: '/learn/'
    },
    {
      text: 'Reading',
      link: '/reading/introduction',
      activeMatch: '/reading/'
    },
    {
      text: 'Blog',
      link: '/blog/introduction',
      activeMatch: '/blog/'
    },
    {
      text: 'Notes',
      link: '/notes/sites',
      activeMatch: '/notes/'
    }
  ]
}

function sidebarBlog() {
  return [{
    text: 'Blog',
    link: '/blog/',
    // collapsible: true,
    items: [{
      text: '[译]JavaScript. The Core: 第2版',
      link: '/blog/译-JavaScript-The-Core-第2版'
    },
    {
      text: 'Modularization',
      link: '/blog/Modularization',
    }
  ]
  }, ]
}

function sidebarLearn() {
  return [{
      text: 'JavaScript高级程序设计',
      collapsible: true,
      // collapsed: true,
      items: [{
          text: "1-什么是JavaScript",
          link: "/learn/JavaScript高级程序设计/1-什么是JavaScript"
        },
        {
          text: "2-HTML中的JavaScript",
          link: "/learn/JavaScript高级程序设计/2-HTML中的JavaScript"
        },
        {
          text: "3-语言基础",
          link: "/learn/JavaScript高级程序设计/3-语言基础"
        },
        {
          text: "4-变量、作用域与内存",
          link: "/learn/JavaScript高级程序设计/4-变量、作用域与内存"
        },
        {
          text: "5-基本引用类型",
          link: "/learn/JavaScript高级程序设计/5-基本引用类型"
        }, {
          text: "6-集合引用类型",
          link: "/learn/JavaScript高级程序设计/6-集合引用类型"
        },
        {
          text: "7-迭代器与生成器",
          link: "/learn/JavaScript高级程序设计/7-迭代器与生成器"
        },
        {
          text: "8-对象、类与面向对象编程",
          link: "/learn/JavaScript高级程序设计/8-对象、类与面向对象编程"
        },
        {
          text: "9-代理与反射",
          link: "/learn/JavaScript高级程序设计/9-代理与反射"
        },
        {
          text: "10-函数",
          link: "/learn/JavaScript高级程序设计/10-函数"
        },
        {
          text: "11-期约与异步函数",
          link: "/learn/JavaScript高级程序设计/11-期约与异步函数"
        },
        {
          text: "12-BOM",
          link: "/learn/JavaScript高级程序设计/12-BOM"
        },
        {
          text: "13-客户端检测",
          link: "/learn/JavaScript高级程序设计/13-客户端检测"
        },
        {
          text: "14-DOM",
          link: "/learn/JavaScript高级程序设计/14-DOM"
        },
        {
          text: "15-DOM扩展",
          link: "/learn/JavaScript高级程序设计/15-DOM扩展"
        }
      ]
    }, {
      text: 'Effective-JavaScript',
      collapsible: true,
      // collapsed: true,
      items: [{
          text: 'Chapter1-Accustoming-Yourself-to-JavaScript',
          link: '/learn/Effective-JavaScript/Chapter1-Accustoming-Yourself-to-JavaScript'
        },
        {
          text: 'Chapter2-Variable-Scope',
          link: '/learn/Effective-JavaScript/Chapter2-Variable-Scope'
        },
        {
          text: 'Chapter3-Working-with-Functions',
          link: '/learn/Effective-JavaScript/Chapter3-Working-with-Functions'
        },
        {
          text: 'Chapter4-Objects-and-Prototypes',
          link: '/learn/Effective-JavaScript/Chapter4-Objects-and-Prototypes'
        },
      ],
    },
    {
      text: 'JavaScript',
      collapsible: true,
      // collapsed: true,
      items: [{
        text: '0-JavaScript继承机制',
        link: '/learn/JavaScript/0-JavaScript继承机制'
      }]
    }
  ]
}

function sidebarNotes() {
  return [{
    text: 'Notes',
    link: '/notes/',
    // collapsible: true,
    items: [
      {
        text: 'Sites',
        link: '/notes/sites'
      },
      {
        text: 'Vue',
        link: '/notes/Vue',
      },
      {
        text: 'JavaScript',
        link: '/notes/JavaScript',
      },
      {
        text: 'Nginx',
        link: '/notes/Nginx',
      },
      {
        text: 'Npm',
        link: '/notes/Npm',
      },
      {
        text: 'CSS',
        link: '/notes/CSS',
      },
      {
        text: 'Shell',
        link: '/notes/Shell',
      },
      {
        text: 'Git',
        link: '/notes/Git',
      },
      {
        text: 'RegExp',
        link: '/notes/RegExp',
      },
      {
        text: 'Modularization',
        link: '/notes/Modularization',
      }
    ]
  }]
}

function sidebarReading() {
  return [{
    text: 'Reading',
    link: '/reading/',
    // collapsible: true,
    items: [{
      text: 'Introduction',
      link: '/reading/introduction',
    }, {
      text: 'CSS',
      link: '/reading/CSS',
    }]
  }]
}