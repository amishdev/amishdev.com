---
title: "Building Swatchit"
slug: building-swatchit
description: "This is a description of the post"
date: 2019-12-04 13:59:57
author: christian
tags:
    - font-end
cover: https://swatchit.io/images/swatchit-image.jpg
fullscreen: true
---

[Swatchit](https://swatchit.io) is my second Vue SPA (the first being [statebuilt.com](https://statebuilt.com)), but Swatchit is far more complex. In this post I want to share the learning experience I had while building it.

### From thin to fat client.

Before Swatchit most of my experience has been programming the backend using php & Laravel. So, the way I naturally wanted to build Swatchit from back to front. I started building api endpoints for every little action. Add Palette, Save Swatch, Reposition Palette / Swatch, and on and on. And all the frontend had to do was make a call to the api for each event.

This didn’t make for a good user experience. For instance, clicking on the “new swatch” button would send a PUT request to the server, wait for a response then push a swatch into the UI. But that half a second delay was confusing enough to click the button again pushing another swatch on.

I also want to mention that it was a frustrating developer experience. If I changed the REST api I had to change the JavaScript too. Some bugs would require a fix on both frontend and back. So, I had to figure something out.

### A more complicated frontend, a simpler backend.

Along with all my other issues, we decided we wanted to make the whole app usable without creating an account. Just hit swatchit.io and boom you can start building your palette, then when you want to save your work you can sign up for an account. This made it impossible for me to use the api the way I was.

**I needed to do a few things.**
-	Move all the data to Vuex
-	Decouple the Vue app from the api
-	Push data to Vuex from a json file or the api if you’re logged in

Remember I was still new to Vue. I’ve only heard of Vuex recently, so all my data was still held in my components (I know it’s ugly). So, bit by bit I put most of the data to Vuex.

To decouple the Vue app from the api I removed most of my endpoints and replaced them with one. This one endpoint was responsible for removing and replacing a user’s palettes. So, all the frontend had to do was grab all the palette data and send it to one endpoint as json. This way my backend was no longer concerned with knowing what order the swatches are in, how to change a swatch color, or how to rename a palette. All the backend is concerned with is replacing all the palettes when changes happen. So, every few seconds my frontend will check for changes and sync those changes with the backend.

Finally, while my Vue app is bootstrapping it grabs some default json data, then if the user is logged in it’ll fetch their data.

Swatchit isn’t the most complicated fat client app ever created but I think it is a good use case for building an app this way.

If you need to store colors, or you work with a designer and like to one click copy color values as SCSS, SASS, or JSON, please give [Swatchit](https://swatchit.io) a try and recommend it to your designer for easy collaboration.
