import { HexType } from './HexType';

export class Hex{
  static side = 10;
  x: number;
  y: number;
  nr: number;
  type: HexType;
  knight: boolean;

  static setSide(side: number): void{
    Hex.side = side;
  }

  constructor(x: number, y: number, nr: number, type: HexType) {
    this.x = x;
    this.y = y;
    this.nr = nr;
    this.type = type;
    this.knight = false;
  }
}
