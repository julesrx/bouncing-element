import type { BouncingElement, FrameTransformer } from './interfaces';
import { random } from './helpers';

export interface Options {
    start?: boolean;
    frameTransformers?: FrameTransformer[];
}

const createBouncer = (elements: HTMLElement[], options?: Options) => {
    options = { start: true, frameTransformers: [], ...options };

    let started = false;
    let bouncers: BouncingElement[];
    let width: number;
    let height: number;
    let frameNumber: number;

    const start = () => {
        if (started) return;
        started = true;

        setup();
        window.addEventListener('resize', setup);
    };

    const setup = (): void => {
        if (frameNumber) window.cancelAnimationFrame(frameNumber);

        width = window.innerWidth - 5;
        height = window.innerHeight - 5;

        bouncers = elements.map(el => {
            el.style.position = 'absolute';

            return {
                element: el,
                x: random(width),
                y: random(height),
                xSpeed: random(2) * (Math.random() > 0.5 ? 1 : -1),
                ySpeed: random(3) * (Math.random() > 0.5 ? 1 : -1),
                direction: Math.random() > 0.5 ? 1 : -1,
                tranformers: options?.frameTransformers ?? [],
                data: (options?.frameTransformers ?? []).reduce(
                    (d: any, t) => ((d[t.key] = t.initialValue), d),
                    {}
                )
            };
        });

        frameNumber = window.requestAnimationFrame(frame);
    };

    const frame = (): void => {
        for (const bo of bouncers) {
            for (const t of bo.tranformers) {
                bo.data[t.key] = t.tranformer(bo, bo.data[t.key]);
            }

            bo.x = bo.x + bo.xSpeed;
            bo.y = bo.y + bo.ySpeed;

            bo.element.style.left = `${bo.x}px`;
            bo.element.style.top = `${bo.y}px`;

            if (bo.x + bo.element.clientWidth >= width) {
                bo.xSpeed = -bo.xSpeed;
                bo.x = width - bo.element.clientWidth;
            } else if (bo.x <= 0) {
                bo.xSpeed = -bo.xSpeed;
                bo.x = 0;
            }

            if (bo.y + bo.element.clientHeight >= height) {
                bo.ySpeed = -bo.ySpeed;
                bo.y = height - bo.element.clientHeight;
            } else if (bo.y <= 0) {
                bo.ySpeed = -bo.ySpeed;
                bo.y = 0;
            }
        }

        frameNumber = window.requestAnimationFrame(frame);
    };

    const stop = () => {
        if (!started) return;
        started = false;

        // TODO: stop all animations and hide
        window.removeEventListener('resize', setup);
    };

    if (options.start) start();

    return { start, stop };
};

export { createBouncer };
