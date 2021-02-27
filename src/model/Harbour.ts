import {HarbourType} from './HarbourType';

export class Harbour{
  x: number;
  y: number;
  resource: HarbourType;

  constructor(x: number, y: number, resource: HarbourType) {
    this.x = x;
    this.y = y;
    this.resource = resource;
  }
}
