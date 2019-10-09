module.exports = {
  // base: '/notes/',
  title: 'PYPARA',
  description: '个人收藏记录',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Repository', link: '/repository/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Notes', link: '/notes/' },
      { text: 'Interview', link: '/interview/' },
      { text: 'GitHub', link: 'https://github.com/PYPARA' },
    ],
    // sidebar: [
    //   {
    //     title: 'Blog',   // 必要的
    //     path: '/blog/',      // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 3,    // 可选的, 默认值是 1
    //     children: [
    //       '/blog/Promise',
    //       '/blog/正则表达式',
    //     ]
    //   },
    // ],
    sidebar: {
      '/blog/': [
        '',
        'Promise',
        '正则表达式',
        '[译] JavaScript. The Core 第2版',
        'CSS中的层叠相关概念',
        '深入理解CSS中的层叠上下文和层叠顺序',
        'for...in、for...of and Array.prototype.forEach()',
        'Vue源码笔记'
      ]
    },
    sidebarDepth: 3
  }
}