import {Vertice} from './Vertice';
import {Edge} from './Edge';

export class Hex{

  readonly x;
  readonly y;
  private resource: number;
  private nr: number;
  private robber: boolean;

  readonly side = 20;
  readonly height = 2 * this.side;
  readonly width = Math.sqrt(3) * this.side;
  readonly inCircRad = this.width / 2;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toVertices(vertices: Vertice[][]): Vertice[]{
    const x = this.y % 2 === 0 ? this.x + 1 : this.x;
    return [
      vertices[2 * x + 1][2 * this.y    ], // Pointy top - North
      vertices[2 * x + 2][2 * this.y + 1], // North East
      vertices[2 * x + 2][2 * this.y + 2], // South East
      vertices[2 * x + 1][2 * this.y + 3], // Pointy Bot - South
      vertices[2 * x    ][2 * this.y + 2], // South West
      vertices[2 * x    ][2 * this.y + 1], // North West
    ];
  }

  toEdges(edges: Edge[][]): Edge[]{
    const x = this.y % 2 === 0 ? this.x + 2 : this.x;
    return [
      edges[4 * x + 3][2 * this.y    ], // North East
      edges[4 * x + 4][2 * this.y + 1], // Flat Right - East
      edges[4 * x + 3][2 * this.y + 2], // South East
      edges[4 * x + 1][2 * this.y + 2], // South West
      edges[4 * x    ][2 * this.y + 1], // Flat Left - West
      edges[4 * x + 1][2 * this.y    ], // North West
    ];
  }

}
