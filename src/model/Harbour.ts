import {Resource} from './Resource';

export class Harbour{
  x: number;
  y: number;
  resource: Resource;

  constructor(x: number, y: number, resource: Resource) {
    this.x = x;
    this.y = y;
    this.resource = resource;
  }
}
