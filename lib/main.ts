import type { BouncingElement, BouncerOptions } from './interfaces';
import { random } from './utils';

const createBouncer = (
    elements: HTMLElement[] | HTMLCollectionOf<HTMLElement> | HTMLCollectionOf<Element>,
    opts?: BouncerOptions
) => {
    const options = { start: true, insert: false, frameTransformers: [], ...opts };

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
        cancelAnimationFrame();

        width = window.innerWidth - 5;
        height = window.innerHeight - 5;

        bouncers = [...elements].map(el => {
            const element = el as HTMLElement;

            element.style.position = 'absolute';

            if (options.insert) document.body.appendChild(element);

            return {
                element,
                x: random(width),
                y: random(height),
                xSpeed: random(2) * (Math.random() > 0.5 ? 1 : -1),
                ySpeed: random(3) * (Math.random() > 0.5 ? 1 : -1),
                direction: Math.random() > 0.5 ? 1 : -1,
                tranformers: opts?.frameTransformers ?? [],
                data: (opts?.frameTransformers ?? []).reduce(
                    (d: any, t) => ((d[t.key] = t.initialValue), d),
                    {}
                )
            };
        });

        frameNumber = window.requestAnimationFrame(() => {
            frame();
            setBouncersVisibility(true);
        });
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

        window.removeEventListener('resize', setup);

        cancelAnimationFrame();
        setBouncersVisibility(false);
    };

    const cancelAnimationFrame = () => {
        if (frameNumber) window.cancelAnimationFrame(frameNumber);
    };

    const setBouncersVisibility = (show: boolean) => {
        for (const bouncer of bouncers) {
            bouncer.element.style.display = show ? 'block' : 'none';
        }
    };

    if (options.start) start();

    return { start, stop };
};

export { createBouncer };
