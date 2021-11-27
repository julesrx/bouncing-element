interface Options {
  selector?: string;
  fps?: number;

  frameTransformers: FrameTransformer[];
}

interface FrameTransformer {
  key: string;
  initialValue: any;
  tranformer(el: BounceElement, value: any): any;
}

interface BounceElement {
  el: HTMLElement;

  x: number;
  y: number;

  xspeed: number;
  yspeed: number;

  dir: number;

  tranformers: FrameTransformer[];
  data: {
    [key: string]: any;
  };
}

class Bouncer {
  private interval: number = 0;
  private elements: BounceElement[];

  private width: number;
  private height: number;

  constructor(options: Options) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.elements = [];

    this.setup(options);
    window.addEventListener('resize', this.frame.bind(this));
  }

  private setup(options: Options): void {
    clearInterval(this.interval);

    for (const el of document.querySelectorAll<HTMLElement>(options.selector ?? '.bounce')) {
      const b: BounceElement = {
        el,
        x: random(this.width),
        y: random(this.height),
        xspeed: random(2),
        yspeed: random(3),
        dir: Math.random() > 0.5 ? 1 : -1,
        tranformers: options.frameTransformers,
        data: options.frameTransformers.reduce((d: any, t) => ((d[t.key] = t.initialValue), d), {})
      };

      this.elements.push(b);
      el.style.position = 'absolute';
    }

    this.interval = setInterval(this.frame.bind(this), fps(options.fps ?? 120));
  }

  private frame(): void {
    for (const el of this.elements) {
      for (const t of el.tranformers) {
        el.data[t.key] = t.tranformer(el, el.data[t.key]);
      }

      el.x = el.x + el.xspeed;
      el.y = el.y + el.yspeed;

      el.el.style.left = `${el.x}px`;
      el.el.style.top = `${el.y}px`;

      if (el.x + el.el.clientWidth >= this.width) {
        el.xspeed = -el.xspeed;
        el.x = this.width - el.el.clientWidth;
      } else if (el.x <= 0) {
        el.xspeed = -el.xspeed;
        el.x = 0;
      }

      if (el.y + el.el.clientHeight >= this.height) {
        el.yspeed = -el.yspeed;
        el.y = this.height - el.el.clientHeight;
      } else if (el.y <= 0) {
        el.yspeed = -el.yspeed;
        el.y = 0;
      }
    }
  }
}

const random = (max: number) => Math.floor(Math.random() * max) + 1;
const fps = (n: number) => Math.floor((1 / n) * 1000);

export default Bouncer;
