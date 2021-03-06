import { BouncerOptions, BouncingElement } from './interfaces';
import { random } from './helpers';

class Bouncer {
  private frameNumber?: number;
  private elements: BouncingElement[] = [];

  private width: number = window.innerWidth;
  private height: number = window.innerHeight;

  constructor(options: BouncerOptions) {
    this.setup(options);
    window.addEventListener('resize', this.setup.bind(this, options));
  }

  private setup(options?: BouncerOptions): void {
    if (this.frameNumber) window.cancelAnimationFrame(this.frameNumber);

    this.width = window.innerWidth - 5;
    this.height = window.innerHeight - 5;

    this.elements = [...document.querySelectorAll<HTMLElement>(options?.selector ?? '.bounce')].map(
      el => {
        el.style.position = 'absolute';

        return {
          element: el,
          x: random(this.width),
          y: random(this.height),
          xSpeed: random(2) * (Math.random() > 0.5 ? 1 : -1),
          ySpeed: random(3) * (Math.random() > 0.5 ? 1 : -1),
          direction: Math.random() > 0.5 ? 1 : -1,
          tranformers: options?.frameTransformers ?? [],
          data: (options?.frameTransformers ?? []).reduce(
            (d: any, t) => ((d[t.key] = t.initialValue), d),
            {}
          )
        };
      }
    );

    this.frameNumber = window.requestAnimationFrame(this.frame.bind(this));
  }

  private frame(): void {
    for (const el of this.elements) {
      for (const t of el.tranformers) {
        el.data[t.key] = t.tranformer(el, el.data[t.key]);
      }

      el.x = el.x + el.xSpeed;
      el.y = el.y + el.ySpeed;

      el.element.style.left = `${el.x}px`;
      el.element.style.top = `${el.y}px`;

      if (el.x + el.element.clientWidth >= this.width) {
        el.xSpeed = -el.xSpeed;
        el.x = this.width - el.element.clientWidth;
      } else if (el.x <= 0) {
        el.xSpeed = -el.xSpeed;
        el.x = 0;
      }

      if (el.y + el.element.clientHeight >= this.height) {
        el.ySpeed = -el.ySpeed;
        el.y = this.height - el.element.clientHeight;
      } else if (el.y <= 0) {
        el.ySpeed = -el.ySpeed;
        el.y = 0;
      }
    }

    this.frameNumber = window.requestAnimationFrame(this.frame.bind(this));
  }
}

export default Bouncer;
