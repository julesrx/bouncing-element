import './style.css';
import { createBouncer } from '../lib/main';

const els = [...document.getElementsByClassName('bounce')] as HTMLElement[];

const { start, stop } = createBouncer(els, {
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
