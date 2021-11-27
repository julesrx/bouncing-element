import { BouncerOptions, BouncingElement } from './interfaces';

class Bouncer {
  private interval: number = 0;
  private elements: BouncingElement[];

  private width: number;
  private height: number;

  constructor(options: BouncerOptions) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.elements = [];

    this.setup(options);
    window.addEventListener('resize', this.frame.bind(this));
  }

  private setup(options: BouncerOptions): void {
    clearInterval(this.interval);

    for (const el of document.querySelectorAll<HTMLElement>(options.selector ?? '.bounce')) {
      this.elements.push({
        element: el,
        x: random(this.width),
        y: random(this.height),
        xSpeed: random(2),
        ySpeed: random(3),
        direction: Math.random() > 0.5 ? 1 : -1,
        tranformers: options.frameTransformers,
        data: options.frameTransformers.reduce((d: any, t) => ((d[t.key] = t.initialValue), d), {})
      });
      el.style.position = 'absolute';
    }

    this.interval = setInterval(this.frame.bind(this), fps(options.fps ?? 120));
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
  }
}

const random = (max: number) => Math.floor(Math.random() * max) + 1;
const fps = (n: number) => Math.floor((1 / n) * 1000);

export default Bouncer;
