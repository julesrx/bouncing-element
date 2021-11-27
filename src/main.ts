import './style.css';
import Bouncer from '../lib/main';

new Bouncer({
  frameTransformers: [
    {
      key: 'hue',
      initialValue: 360,
      tranformer: (el, value) => {
        el.el.style.color = `hsl(${value}, 100%, 50%)`;
        return value == 360 ? 0 : value + 1;
      }
    }
  ]
});
