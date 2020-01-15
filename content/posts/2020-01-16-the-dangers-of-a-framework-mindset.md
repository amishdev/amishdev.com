---
title: "The Dangers of a Framework Mindset"
slug: the-dangers-of-a-framework-mindset
description: "How do we solve problems"
date: 2020-01-16
author: christian
tags:
    - problem-solving
cover: https://images.unsplash.com/reserve/oIpwxeeSPy1cnwYpqJ1w_Dufer%20Collateral%20test.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1216&q=80
fullscreen: true
---

Whether building an oak chair, a new barn, or software using the right tools for the job is a must. But I often find that relying on frameworks, libraries and other "rented" tools is counterproductive.

For example, I started learning how to build with [Phalcon](https://phalcon.io), a PHP framework written as a c extension. When building a login system I needed to set a cookie. So, I started reading how to set cookies in Phalcon, I ran into some issues because not everything in Phalcon is enabled by default. About half an hour later I slap myself in the face and ask, “why don’t I just use the `setcookie()` method?”

This is the danger of a framework mindset.
Getting too caught up in solving problems “The Laravel Way,” or in this case “The Phalcon Way,” can limit our problem-solving abilities using the language that is already given to us. The same goes for using composer or npm packages, we find ourselves with a problem and we search for a solution on GitHub.  Using a package is perfectly reasonable if it works, but sometimes it creates more work than solving our problem from scratch.
When building the color pickers on [Swatchit.io](https://swatchit.io) we originally looked around for some existing Vue components. Until we took some time to think about how they work. The HSL sliders, for example, are simple to build from scratch.
3 range inputs the hue goes from 0-360, saturation and lightness from 0-100.
The hue slider is a gradient, the saturation is a solid color with a gradient from solid gray to transparent, and lightness is a solid color with a gradient that goes from solid black to transparent to solid white.
Not using a library saved us the headache of overriding someone else’s CSS.

Instead of our instinct to ask ourselves “how do I solve my problem using this framework,” or “is there a package out there that will solve this for me,” we should first ask “does my language provide me the ability to solve this quickly with little maintenance,” or “will it be just as much work to use someone else’s code as it would be to build from scratch?”
