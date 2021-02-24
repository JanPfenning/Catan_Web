import {Vertex} from './Vertex';
import {Hex} from './Hex';
import {Edge} from './Edge';
import {Harbour} from './Harbour';

export class CatanMap{
  private hexes: Hex[][] = [];
  private vertices: Vertex[][] = [];
  private edges: Edge[][] = [];
  private harbours: Harbour[] = [];
  readonly height: number;
  readonly width: number;

  constructor(str: string) {
    const json = JSON.parse(str);
    this.width = json.hexes[0].length;
    this.height = json.hexes.length;
    this.hexes = json.hexes;
    this.edges = json.edges;
    this.harbours = json.harbours;
    this.vertices = json.vertices;
    // console.log(this.getHexes());
  }

  getHexes(): Hex[][]{
    return this.hexes;
  }

  getVertices(): Vertex[][] {
    return this.vertices;
  }

  getEdges(): Edge[][]{
    return this.edges;
  }

  getHarbours(): Harbour[]{
    return this.harbours;
  }
}
