import {Vertice} from './Vertice';
import {Hex} from './Hex';
import {Edge} from './Edge';

export class CatanMap{
  private hexes: Hex[][] = [];
  private vertices: Vertice[][] = [];
  private edges: Edge[][] = [];
  readonly height: number;
  readonly width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;

    for (let i = 0; i < height; i++) {
      this.hexes[i] = [];
      for (let j = 0; j < width; j++) {
        this.hexes[i][j] = new Hex(i, j);
      }
    }

    for (let i = 0; i <= 2 * height; i++) {
      this.vertices[i] = [];
      for (let j = 0; j <= 2 * width; j++) {
        this.vertices[i][j] = new Vertice(i, j);
      }
    }

    for (let i = 0; i <= 2 * height ; i++) {
      this.edges[i] = [];
      for (let j = 0; j < 4 * width + 2; j++) {
        this.edges[i][j] = new Edge(i, j);
      }
    }

    console.log(this.hexes);
    console.log(this.hexes[2][1].toVertices(this.vertices));
    console.log(this.hexes[2][1].toEdges(this.edges));
  }

  getHexes(): Hex[][]{
    return this.hexes;
  }

  getVertices(): Vertice[][] {
    return this.vertices;
  }

  getEdges(): Edge[][]{
    return this.edges;
  }
}
