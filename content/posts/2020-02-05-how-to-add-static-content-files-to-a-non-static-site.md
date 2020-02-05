---
title: "How to add static content generation to a standard Vue SPA"
slug: how-to-add-static-content-generation-to-a-standard-vue-spa
description: "This is a description of the post"
date: 2020-02-05 13:59:57
author: christian
tags:
    - front-end
cover: https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80
fullscreen: true
---
Static site generators like [gridsome](https://gridsome.org) are awesome for sites like this blog. But they may not be a fit for a full-blown web app.

So maybe you already have a standard Vue app, maybe with a Laravel backend like me and you have quite a bit of content written into your Vue templates. If you do it's easy to find yourself regularly searching though templates to update some text.
What I'm about to show you is how to break that text out of the template and into more manageable YAML files.

First, we're going to install a few webpack loaders from .npm

With npm:

`npm install amish-yaml-loader json-markdown-loader json-loader --save-dev`

with yarn:

`yarn add amish-yaml-loader json-markdown-loader json-loader -D`

Next, we'll add the loaders to our webpack config.
```js
module: {
        rules: [
            {
                test: /\.ya?ml$/,
                use: ['json-loader', 'json-markdown-loader', 'amish-yaml-loader'],
            },
        ],
    }
```
If you're using laravel-mix you can call `mix.webpackConfig({/* the code above */})`.

Now you're ready to write your yaml files.

```yaml
---
title: About
body:
  type: markdown
  value: >
    ## Why do the Amish need software to manage their businesses?
    [link example](https://amishdev.com)
    **bold text**
```

Now we can import them into a Vue component.
```js
import content from '../content/path/about.yaml';

export default {
    data() {
        return {content}
    },
}
```

Then use the content in our template
```html
<template>
    <div>
        <h1>{{ content.title }}</h1>
        <div v-html="content.body"></div>
    </div>
</template>
```

Now you have some nicely organized content out of your templates.

### How does this work?

When you run webpack it uses loaders to compile files down to a usable format (in our case json).

So in our statement `test: /\.ya?ml$/` will find any imports for .yaml or .yml files and will use any loaders we specified below that.
They run from right to left in the array.

First, is the [amish-yaml-loader](https://github.com/amishdev/yaml-loader) (which I made) this will load in our yaml file and convert it to json.


Next, is the [json-markdown-loader](https://github.com/amishdev/json-markdown-loader) (I also made), this will take the output of the last loader and recursively look for anything denoted markdown,
then transform that markdown to html.


Lastly is the standard json-loader by webpack.

The result of importing is just a plain old JSON object.