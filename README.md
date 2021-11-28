# Bouncing Element

![npm](https://img.shields.io/npm/v/bouncing-element)

JavaScript library to reproduce the famous DVD screensaver with any DOM element.

## Installation

- Via CDN:

```html
<script src="https://unpkg.com/bouncing-element"></script>
```

- Using npm:

```bash
$ npm i bouncing-element
```

## Usage

```ts
import Bouncer from 'bouncing-element'; // if installed via NPM

// Create the bouncer
new Bouncer({
  // querySelector (default '.bounce')
  selector: '.bounce',

  // frames per second (default 120)
  fps: 120,

  // frame transformers (default [])
  // used to add different effects to the elements for each frame
  frameTransformers: [
    {
      // tranform key
      key: 'hue',

      // initial value
      initialValue: 0,

      // tranform function
      tranformer: (bouncingEl, value) => {
        bouncingEl.element.style.color = `hsl(${value}, 100%, 50%)`;
        return value == 360 ? 0 : value + 1;
      }
    }
  ]
});
```
