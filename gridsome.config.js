class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  siteName: 'amishDev',
  siteDescription: "A site about crafting software.",
  siteUrl: 'https://amishdev.com',
  titleTemplate: `%s | Bleda`,
  icon: 'src/favicon.png',

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        ['gridsome-plugin-remark-shiki', {
          theme: 'min-light'
        }]
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
          author: {
            typeName: 'Author',
            create: true,
          },
        },
      },
    },
    // {
    //   use: '@gridsome/plugin-google-analytics',
    //   options: {
    //     id: 'UA-135446199-1',
    //   },
    // },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      },
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Bleda, a Gridsome blog starter',
          feed_url: 'https://amishdev.com/feed.xml',
          site_url: 'https://amishdev.com',
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://amishdev.com/' + node.slug,
          author: node.author,
          date: node.date,
        }),
        output: {
          dir: './static',
          name: 'feed.xml',
        },
      },
    },
  ],

  templates: {
    Post: '/:title',
    Tag: '/tag/:id',
    Author: '/author/:id',
  },

  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...[
          require('postcss-import'),
          require('postcss-nested'),
          require('tailwindcss'),
        ])

        if (process.env.NODE_ENV === 'production') {
          options.plugins.push(...[
            require('@fullhuman/postcss-purgecss')({
              content: [
                'src/assets/**/*.css',
                'src/**/*.vue',
                'src/**/*.js'
              ],
              extractors: [
                {
                  extractor: TailwindExtractor,
                  extensions: ['css', 'vue', 'js']
                }
              ],
              whitelistPatterns: [/shiki/]
            }),
          ])
        }

        return options
      })
  },
}





