export interface BouncerOptions {
  selector?: string;

  frameTransformers: FrameTransformer[];
}

export interface FrameTransformer {
  key: string;
  initialValue: any;
  tranformer(el: BouncingElement , value: any): any;
}

export interface BouncingElement {
  element: HTMLElement;

  x: number;
  y: number;

  xSpeed: number;
  ySpeed: number;

  direction: number;

  tranformers: FrameTransformer[];
  data: {
    [key: string]: any;
  };
}
