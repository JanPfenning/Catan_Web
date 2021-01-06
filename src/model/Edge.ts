export class Edge{
  readonly x;
  readonly y;

  private structure: number;
  private owner: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}
