import './style.css';
import { createBouncer } from '../lib/main';
import favicon from '../favicon.svg?raw';

const emojis = ['🐧', '🌱', '👨‍💻', '🎮', '🍝', '🌈', '📀', '🎬', '🏍', '🐸', '🚀'];

const elements = new Array(5)
    .fill(emojis)
    .flat()
    .map(e => {
        const el = document.createElement('i');
        el.innerText = e;

        return el;
    });

const div = document.createElement('div');
div.innerHTML = favicon;
const svg = div.querySelector('svg');

elements.push(svg as unknown as HTMLElement);

const { start, stop } = createBouncer(elements, {
    insert: true,
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

document.getElementById('start')!.addEventListener('click', start);
document.getElementById('stop')!.addEventListener('click', stop);
