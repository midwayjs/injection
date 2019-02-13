'use strict';

module.exports = {
  base: '/injection/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Injection',
      description: '轻量的 Node.js 应用依赖注入容器',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Injection',
      description: 'A lightweight inversion of control container for Node.js apps',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        repo: 'midwayjs/injection',
        docsDir: 'docs',
        editLinks: true,
        serviceWorker: {
          updatePopup: true,
        },
        nav: [
          { text: '首页', link: '/' },
          { text: '依赖注入手册', link: '/guide' },
          {
            text: 'API',
            link: 'http://midwayjs.org/injection/api-reference/globals.html',
          },
          {
            text: 'Github',
            link: 'https://github.com/midwayjs/injection',
          },
          {
            text: 'MidwayJs 系列产品',
            items: [
              {
                text: '框架',
                items: [
                  { text: 'Midway - 面向未来的 Web 全栈框架', link: '/' },
                ],
              },
              {
                text: '应用管理',
                items: [
                  {
                    text: 'Pandora.js - Node.js 应用管理器',
                    link: 'http://midwayjs.org/pandora/',
                  },
                ],
              },
              {
                text: '监控产品',
                items: [
                  { text: 'Sandbox - 私有化 Node.js 监控产品', link: '#' },
                ],
              },
              {
                text: 'Node.js 依赖注入模块',
                items: [
                  { text: 'Injection - 让你的应用用上 IoC，体验依赖注入的感觉', link: 'http://midwayjs.org/injection' },
                ]
              }
            ],
          },
        ],
      },
      '/en/': {
        repo: 'midwayjs/injection',
        docsDir: 'docs',
        editLinks: true,
        serviceWorker: {
          updatePopup: true,
        },
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'IoC Guide', link: '/en/guide' },
          {
            text: 'API',
            link: 'http://midwayjs.org/injection/api-reference/globals.html',
          },
          {
            text: 'Github',
            link: 'https://github.com/midwayjs/injection',
          },
          {
            text: 'MidwayJs Team',
            items: [
              {
                text: 'Framework',
                items: [
                  {
                    text: 'Midway - Future oriented Web framework',
                    link: '/en/',
                  },
                ],
              },
              {
                text: 'Application Manger',
                items: [
                  {
                    text: 'Pandora.js - Node.js Application Manager',
                    link: 'http://midwayjs.org/pandora/',
                  },
                ],
              },
              {
                text: 'Monitoring',
                items: [{ text: 'Sandbox - Private Node.js APM', link: '#' }],
              },
              {
                text: 'Node.js Injection Module',
                items: [
                  { text: 'Injection - Use IoC in your Node.js application', link: 'http://midwayjs.org/injection' },
                ]
              }
            ],
          },
        ],
      },
    },
  },
  lastUpdated: 'Last Updated',
};
