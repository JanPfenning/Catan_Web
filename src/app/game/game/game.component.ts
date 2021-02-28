import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {Hex} from '../../../model/Hex';
import {hexToAdjVertices, pointInTriangle, vertexToAdjEdges, vertexToAdjHexes, vertexToAdjVertices} from '../../translator';
import {Vertex} from '../../../model/Vertex';
import {HexType} from '../../../model/HexType';
import {Gamestate} from '../../../model/Gamestate';
import {Structure} from '../../../model/Structure';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  gameService: GameService;
  onHexClick = this.getHexPosition;

  constructor(gameService: GameService,
              private ref: ChangeDetectorRef) {
    this.gameService = gameService;
  }

  ngOnInit(): void {
  }

  getHexPosition(): void{
    // @ts-ignore
    this.gameService.cur_hex_comp = this;
  }

  // tslint:disable-next-line:typedef
  getClickedEdge(){
    //
  }

  getClickedVertex($event): void{
    const a = (Math.sin(90 * Math.PI / 180) * Hex.side) / Math.sin(60 * Math.PI / 180);
    const rcx = $event.offsetX - this.gameService.cur_hex_comp.x_center;
    const rcy = this.gameService.cur_hex_comp.y_center - $event.offsetY;
    const rc = {x: rcx, y: rcy};
    const center = {x: 0, y: 0};
    const ne = {x: Hex.side, y: a};
    const e = {x: Hex.side, y: 0};
    const se = {x: Hex.side, y: -a};
    const sw = {x: -Hex.side, y: -a};
    const w = {x: -Hex.side, y: 0};
    const nw = {x: -Hex.side, y: a};
    const adj_vert = hexToAdjVertices(this.gameService.cur_hex_comp.hex);
    if (pointInTriangle(rc, center, ne, e)){
      this.placeBuilding(0, adj_vert[1], true);
    }else if (pointInTriangle(rc, center, e, se)){
      this.placeBuilding(0, adj_vert[2], true);
    }else if (pointInTriangle(rc, center, se, sw)){
      this.placeBuilding(0, adj_vert[3], true);
    }else if (pointInTriangle(rc, center, sw, w)){
      this.placeBuilding(0, adj_vert[4], true);
    }else if (pointInTriangle(rc, center, w, nw)){
      this.placeBuilding(0, adj_vert[5], true);
    }else if (pointInTriangle(rc, center, nw, ne)){
      this.placeBuilding(0, adj_vert[0], true);
    }
  }

  interact($event: MouseEvent): void{
    this.getClickedVertex($event);
  }

  placeBuilding(building: number, cood: [x: number, y: number], initialPut: boolean): void {
    if (!(this.gameService.gameObject.state === Gamestate.INITIAL_PLACE &&
      this.gameService.gameObject.whos_turn.PID === this.gameService.playerObject.meta.PID)){
      return null;
    }
    const vert_comp = this.gameService.vert_comps[cood[0]][cood[1]];
    const dummy_vert = new Vertex(cood[0], cood[1]);
    let applicable = true;
    const adj_vert = vertexToAdjVertices(dummy_vert);
    // TODO only deny if settlement on settlement
    if (this.gameService.vert_comps[cood[0]][cood[1]].vertex.owner_id !== null){
      applicable = false;
    }
    // TODO if adj vert does not exist it counts as owner_id null
    if (this.gameService.vert_comps[adj_vert[0][0]][adj_vert[0][1]].vertex.owner_id !== null ||
        this.gameService.vert_comps[adj_vert[1][0]][adj_vert[1][1]].vertex.owner_id !== null ||
        this.gameService.vert_comps[adj_vert[2][0]][adj_vert[2][1]].vertex.owner_id !== null){
      applicable = false;
      console.log(`You cant place a building that close to another building`);
    }
    const adj_hexes = vertexToAdjHexes(dummy_vert);
    // TODO if adj hex does not exist it counts as water
    if (this.gameService.hex_comps[adj_hexes[0][0]][adj_hexes[0][1]].hex.type === HexType.Water &&
        this.gameService.hex_comps[adj_hexes[1][0]][adj_hexes[1][1]].hex.type === HexType.Water &&
        this.gameService.hex_comps[adj_hexes[2][0]][adj_hexes[2][1]].hex.type === HexType.Water){
      applicable = false;
      console.log(`You cant place a building inside the ocean`);
    }
    if (!initialPut){
      const adj_edges = vertexToAdjEdges(dummy_vert);
      // TODO if adj edge does not exist it counts as not connected
      if (this.gameService.edge_comps[adj_edges[0][0]][adj_edges[0][1]].edge.owner_id !== this.gameService.playerObject.meta.PID &&
          this.gameService.edge_comps[adj_edges[1][0]][adj_edges[1][1]].edge.owner_id !== this.gameService.playerObject.meta.PID &&
          this.gameService.edge_comps[adj_edges[2][0]][adj_edges[2][1]].edge.owner_id !== this.gameService.playerObject.meta.PID){
        applicable = false;
        console.log(`You cant place a building without it being connected to a street or ship`);
      }
    }
    if (applicable){
      console.log(`applicable`);
      if (this.gameService.vert_blueprint !== null){
        // remove it
        this.gameService.vert_blueprint.r = 0;
        this.gameService.vert_blueprint = null;
      }
      // console.log(vert_comp);
      // Place the new Blueprint
      this.gameService.vert_blueprint = vert_comp;
      vert_comp.color = `rgb(100, 200, 0)`;
      vert_comp.r = 2;
    }
  }

  submitBuilding(): void {
    const vert = this.gameService.vert_blueprint.vertex;
    this.gameService.build(Structure.City, vert.x, vert.y).subscribe(result => {
      this.gameService.vert_blueprint = null;
      this.gameService.edge_blueprint = null;
    });
  }

  nextTurn(): void{
    this.gameService.nextTurn().subscribe();
  }
}
