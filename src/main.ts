import './style.css';
import Bouncer from '../lib/main';

new Bouncer({
  selector: '.bounce',
  fps: 120,
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
