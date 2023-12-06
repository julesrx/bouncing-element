# Bouncing Element

[![npm](https://img.shields.io/npm/v/bouncing-element)](https://npmjs.com/bouncing-element)
[![Build](https://github.com/julesrx/bouncing-element/actions/workflows/build.yml/badge.svg)](https://github.com/julesrx/bouncing-element/actions/workflows/build.yml)

JavaScript library to reproduce the famous DVD screensaver with any DOM element.

## Installation

- Via CDN:

```html
<script src="https://unpkg.com/bouncing-element"></script>
```

- Using npm:

```bash
npm i bouncing-element
```

## Usage

```ts
import { createBouncer } from 'bouncing-element';

// Create the bouncer
const { start, stop } = createBouncer(elements, {
    // set to true to insert the elements to the body (default: false)
    insert: true,

    // frame transformers (default: [])
    // used to add different effects to the elements for each frame
    frameTransformers: [
        {
            key: 'hue',
            initialValue: 0,
            tranformer: (el, value) => {
                el.element.style.color = `hsl(${value}, 100%, 50%)`;
                return value == 360 ? 0 : value + 1;
            }
        }
    ]
});
```
