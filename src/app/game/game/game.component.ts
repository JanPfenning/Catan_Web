import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {Hex} from '../../../model/Hex';
import {
  edgeToAdjEdges,
  edgeToAdjHexes,
  edgeToAdjVertices,
  hexToAdjEdges,
  hexToAdjVertices,
  pointInTriangle,
  vertexToAdjEdges,
  vertexToAdjHexes,
  vertexToAdjVertices
} from '../../translator';
import {Vertex} from '../../../model/Vertex';
import {HexType} from '../../../model/HexType';
import {Structure} from '../../../model/Structure';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Edge} from '../../../model/Edge';
import {EdgeComponent} from '../hex-svg/edge/edge.component';
import {VertexComponent} from '../hex-svg/vertex/vertex.component';
import {Meta} from '../../../model/Player';
import {Gamestate} from '../../../model/Gamestate';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  gameService: GameService;
  onHexClick = this.getHexPosition;
  structureChoose: FormGroup;
  settlement = Structure.Settlement;
  city = Structure.City;
  road = Structure.Road;
  ship = Structure.Ship;

  barChartLabels: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  barChartData: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(gameService: GameService,
              private ref: ChangeDetectorRef,
              fb: FormBuilder,
              public dialog: MatDialog) {
    this.gameService = gameService;

    this.structureChoose = fb.group({structure: ['', Validators.required]});
    this.structureChoose.get('structure').patchValue(this.settlement.toString());
    this.gameService.buildStructure = Structure.Settlement;
    this.gameService.gameComponent = this;
  }

  ngOnInit(): void {
  }

  updateChart(): void{
    const recents = [];
    for (let i = 0; i <= 12 ; i++) {
      const arr = this.gameService.gameObject.rollHistory;
      recents[i] = arr.filter(x => x === i).length;
    }
    this.barChartData = recents;
  }

  getHexPosition(): void{
    // @ts-ignore
    this.gameService.cur_hex_comp = this;
  }

  getClickedEdge($event): void{
    const rcx = $event.offsetX - this.gameService.cur_hex_comp.x_center;
    const rcy = this.gameService.cur_hex_comp.y_center - $event.offsetY;
    const rc = {x: rcx, y: rcy};
    const center = {x: 0, y: 0};
    const n = {x: 0, y: Hex.side};
    const ne = {x: (Math.sqrt(3) / 2) * Hex.side, y: Hex.side / 2};
    const se = {x: (Math.sqrt(3) / 2) * Hex.side, y: -Hex.side / 2};
    const s = {x: 0, y: -Hex.side};
    const sw = {x: -(Math.sqrt(3) / 2) * Hex.side, y: -Hex.side / 2};
    const nw = {x: -(Math.sqrt(3) / 2) * Hex.side, y: Hex.side / 2};
    const adj_edges = hexToAdjEdges(this.gameService.cur_hex_comp.hex);
    const initialPut = (+this.gameService.gameObject.state === Gamestate.INITIAL_PLACE_FORWARD ||
                        +this.gameService.gameObject.state === Gamestate.INITIAL_PLACE_BACKWARD);
    if (pointInTriangle(rc, center, n, ne)){
      // console.log('north-east');
      this.placeBuilding(this.gameService.buildStructure, adj_edges[0], initialPut);
    }else if (pointInTriangle(rc, center, ne, se)){
      // console.log('east');
      this.placeBuilding(this.gameService.buildStructure, adj_edges[1], initialPut);
    }else if (pointInTriangle(rc, center, se, s)){
      // console.log('south-east');
      this.placeBuilding(this.gameService.buildStructure, adj_edges[2], initialPut);
    }else if (pointInTriangle(rc, center, s, sw)){
      // console.log('sout-west');
      this.placeBuilding(this.gameService.buildStructure, adj_edges[3], initialPut);
    }else if (pointInTriangle(rc, center, sw, nw)){
      // console.log('west');
      this.placeBuilding(this.gameService.buildStructure, adj_edges[4], initialPut);
    }else if (pointInTriangle(rc, center, nw, n)){
      // console.log('north-west');
      this.placeBuilding(this.gameService.buildStructure, adj_edges[5], initialPut);
    }else {
      console.log(n);
      console.log(ne);
      console.log(se);
      console.log(s);
      console.log(sw);
      console.log(nw);
    }
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
    const initialPut = (+this.gameService.gameObject.state === Gamestate.INITIAL_PLACE_FORWARD ||
                        +this.gameService.gameObject.state === Gamestate.INITIAL_PLACE_BACKWARD);
    if (pointInTriangle(rc, center, ne, e)){
      this.placeBuilding(this.gameService.buildStructure, adj_vert[1], initialPut);
    }else if (pointInTriangle(rc, center, e, se)){
      this.placeBuilding(this.gameService.buildStructure, adj_vert[2], initialPut);
    }else if (pointInTriangle(rc, center, se, sw)){
      this.placeBuilding(this.gameService.buildStructure, adj_vert[3], initialPut);
    }else if (pointInTriangle(rc, center, sw, w)){
      this.placeBuilding(this.gameService.buildStructure, adj_vert[4], initialPut);
    }else if (pointInTriangle(rc, center, w, nw)){
      this.placeBuilding(this.gameService.buildStructure, adj_vert[5], initialPut);
    }else if (pointInTriangle(rc, center, nw, ne)){
      this.placeBuilding(this.gameService.buildStructure, adj_vert[0], initialPut);
    }
  }

  interact($event: MouseEvent): void{
    this.getSettlements();
    this.getStreets();
    if (+this.gameService.buildStructure === +Structure.Ship || +this.gameService.buildStructure === +Structure.Road){
      if (this.gameService.gameObject.state === Gamestate.INITIAL_PLACE_FORWARD) {
        if (this.gameService.myStreets === 0){
          this.getClickedEdge($event);
        }else if (this.gameService.myStreets === 1){
          alert(`You are not allowed to place another free Street/Ship. You already own one.\n Please press next Turn`);
        }
      }else if (this.gameService.gameObject.state === Gamestate.INITIAL_PLACE_BACKWARD) {
        if (this.gameService.myStreets === 1){
          this.getClickedEdge($event);
        }else if (this.gameService.myStreets === 2){
          alert(`You are not allowed to place another free Street/Ship. You already own two.\n Please press next Turn`);
        }
      }else{
        this.getClickedEdge($event);
      }
    }else{
      if (this.gameService.gameObject.state === Gamestate.INITIAL_PLACE_FORWARD) {
        if (this.gameService.mySettles === 0){
          this.getClickedVertex($event);
        }else if (this.gameService.mySettles === 1){
          if (this.gameService.myStreets === 1){
            alert(`You are not allowed to place another free Settlement. You already own one.\n Please press next Turn`);
          }else{
            alert(`You are not allowed to place another free Settlement. You already own one.\n Please place your Road/Ship`);
          }
        }
      }else if (this.gameService.gameObject.state === Gamestate.INITIAL_PLACE_BACKWARD) {
        if (this.gameService.mySettles === 1){
          this.getClickedVertex($event);
        }else if (this.gameService.mySettles === 2){
          if (this.gameService.myStreets === 2){
            alert(`You are not allowed to place another free Settlement. You already own two.\n Please press next Turn`);
          }else{
            alert(`You are not allowed to place another free Settlement. You already own two.\n Please place your Road/Ship`);
          }
        }
      }else{
        this.getClickedVertex($event);
      }
    }
  }

  placeBuilding(building: Structure, cood: [x: number, y: number], initialPut: boolean): void {
    if (this.gameService.gameObject.whos_turn.PID !== this.gameService.playerObject.meta.PID){
      return null;
    }
    let applicable;
    if (+building === +Structure.Ship){
      applicable = this.checkShip(cood, initialPut);
    }
    else if (+building === +Structure.Road){
      applicable = this.checkRoad(cood, initialPut);
    }
    else if (+building === +Structure.Settlement){
      applicable = this.checkSettlement(cood, initialPut);
    }
    else if (+building === +Structure.City){
      applicable = this.checkCity(cood, initialPut);
    }

    if (+building === +Structure.Settlement || +building === +Structure.City){
      const vert_comp = this.gameService.vert_comps[cood[0]][cood[1]];
      if (applicable){
        if (this.gameService.vert_blueprint !== null){
          // remove it
          this.gameService.vert_blueprint.settlement = false;
          this.gameService.vert_blueprint.city = false;
          this.gameService.vert_blueprint = null;
        }
        // Place the new Blueprint
        this.gameService.vert_blueprint = vert_comp;
        vert_comp.color = this.gameService.playerObject.meta.colour;
        if (+building === +Structure.Settlement){
          vert_comp.settlement = true;
        }
        else if (+building === +Structure.City){
          vert_comp.settlement = false;
          vert_comp.city = true;
        }
        console.log(vert_comp);
      }
    }
    else if (+building === +Structure.Ship || +building === +Structure.Road){
      const edge_comp = this.gameService.edge_comps[cood[0]][cood[1]];
      if (applicable){
        if (this.gameService.edge_blueprint !== null){
          // remove it
          this.gameService.edge_blueprint.street = false;
          this.gameService.edge_blueprint.ship = false;
          this.gameService.edge_blueprint = null;
        }
        // Place the new Blueprint
        console.log(edge_comp);
        this.gameService.edge_blueprint = edge_comp;
        edge_comp.fillColor = this.gameService.playerObject.meta.colour;
        if (+building === +Structure.Ship){
          edge_comp.street = false;
          edge_comp.ship = true;
        }else if (+building === +Structure.Road){
          edge_comp.street = true;
          edge_comp.ship = false;
        }
      }
    }
  }

  checkSettlement(cood, initialPut): boolean{
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
    return applicable;
  }

  submitBuilding(): void {
    if (+this.gameService.buildStructure === +Structure.Settlement || +this.gameService.buildStructure === +Structure.City){
      const vert = this.gameService.vert_blueprint.vertex;
      this.gameService.build(this.gameService.buildStructure, vert.x, vert.y).subscribe(
        value => {
          this.cancelBuilding();
      },
       error => {
        this.cancelBuilding();
      });
    }else if (+this.gameService.buildStructure === +Structure.Road || +this.gameService.buildStructure === +Structure.Ship){
      const edge = this.gameService.edge_blueprint.edge;
      this.gameService.build(this.gameService.buildStructure, edge.x, edge.y).subscribe(
        result => {
          this.cancelBuilding();
      },
      error => {
        this.cancelBuilding();
      });
    }
  }

  nextTurn(): void{
    if (this.gameService.gameObject.state === Gamestate.INITIAL_PLACE_FORWARD){
      this.getSettlements();
      this.getStreets();
      if (this.gameService.mySettles !== 1){
        alert('Please Place your settlement before handing over');
        return;
      }else if (this.gameService.myStreets !== 1){
        alert('Please Place your street/ship before handing over');
        return;
      }
    }
    this.gameService.nextTurn().subscribe();
  }

  getSettlements(): void{
    let my_settles = 0;
    let all_settles = 0;
    this.gameService.vert_comps.forEach(line => {
      line.forEach(vert_comp => {
        if (vert_comp.vertex.owner_id){
          all_settles ++;
          if (vert_comp.vertex.owner_id === this.gameService.playerObject.meta.PID) {
            my_settles ++;
          }
        }
      });
    });
    this.gameService.mySettles = my_settles;
    this.gameService.allSettles = all_settles;
  }

  getStreets(): void{
    let my_streets = 0;
    let all_streets = 0;
    this.gameService.edge_comps.forEach(line => {
      line.forEach(edge_comp => {
        if (edge_comp.edge.owner_id){
          all_streets ++;
          if (edge_comp.edge.owner_id === this.gameService.playerObject.meta.PID) {
            my_streets ++;
          }
        }
      });
    });
    this.gameService.myStreets = my_streets;
    this.gameService.allStreets = all_streets;
  }

  private checkShip(cood: [x: number, y: number], initialPut: boolean): boolean {
    const edges = this.checkEdgeApplicable(cood, initialPut, Structure.Road);

    let hexes = true;
    const dummy_edge = new Edge(cood[0], cood[1]);
    const adj_hexes = edgeToAdjHexes(dummy_edge);
    if (this.gameService.hex_comps[adj_hexes[0][0]][adj_hexes[0][1]].hex.type !== HexType.Water &&
      this.gameService.hex_comps[adj_hexes[1][0]][adj_hexes[1][1]].hex.type !== HexType.Water){
      hexes = false;
      console.log(`You cant place a ship surrounded by land`);
    }

    return (hexes && edges);
  }

  private checkRoad(cood: [x: number, y: number], initialPut: boolean): boolean{
    const edges = this.checkEdgeApplicable(cood, initialPut, Structure.Ship);

    let hexes = true;
    const dummy_edge = new Edge(cood[0], cood[1]);
    const adj_hexes = edgeToAdjHexes(dummy_edge);
    if (this.gameService.hex_comps[adj_hexes[0][0]][adj_hexes[0][1]].hex.type === HexType.Water &&
      this.gameService.hex_comps[adj_hexes[1][0]][adj_hexes[1][1]].hex.type === HexType.Water){
      hexes = false;
      console.log(`You cant place a road inside the ocean`);
    }

    return (hexes && edges);
  }

  private checkEdgeApplicable(cood: [x: number, y: number], initialPut: boolean, prohibitChange: Structure): boolean {
    const myMeta = this.gameService.playerObject.meta;
    const dummy_edge = new Edge(cood[0], cood[1]);
    let applicable = true;
    if (this.gameService.edge_comps[cood[0]][cood[1]].edge.owner_id !== null){
      applicable = false;
    }
    const adj_vert = edgeToAdjVertices(dummy_edge);
    const upper = this.gameService.vert_comps[adj_vert[0][0]][adj_vert[0][1]];
    const lower = this.gameService.vert_comps[adj_vert[1][0]][adj_vert[1][1]];
    const adj_edge = edgeToAdjEdges(dummy_edge);
    const clockwiseEdge1 = this.gameService.edge_comps[adj_edge[0][0]][adj_edge[0][1]];
    const clockwiseEdge2 = this.gameService.edge_comps[adj_edge[1][0]][adj_edge[1][1]];
    const clockwiseEdge3 = this.gameService.edge_comps[adj_edge[2][0]][adj_edge[2][1]];
    const clockwiseEdge4 = this.gameService.edge_comps[adj_edge[3][0]][adj_edge[3][1]];
    const edge1 = this.checkEdge(clockwiseEdge1, upper, myMeta, initialPut, prohibitChange);
    const edge2 = this.checkEdge(clockwiseEdge2, upper, myMeta, initialPut, prohibitChange);
    const edge3 = this.checkEdge(clockwiseEdge3, lower, myMeta, initialPut, prohibitChange);
    const edge4 = this.checkEdge(clockwiseEdge4, lower, myMeta, initialPut, prohibitChange);

    if (!(edge1 || edge2 || edge3 || edge4)){
      applicable = false;
      console.log(`Building must be connected to another Road or at least the Building`);
    }
    return applicable;
  }

  private checkCity(cood: [x: number, y: number], initialPut: boolean): boolean {
    const vert = this.gameService.vert_comps[cood[0]][cood[1]].vertex;
    if (initialPut || +vert.building !== Structure.Settlement || +vert.owner_id !== +this.gameService.playerObject.meta.PID){
      return false;
    }else{
      return true;
    }
  }

  updateStructure(): void {
    this.gameService.buildStructure = this.structureChoose.get('structure').value;
    switch (this.structureChoose.get('structure').value){
      case(Structure.Settlement): this.gameService.buildStructure = Structure.Settlement; break;
      case(Structure.City): this.gameService.buildStructure = Structure.City; break;
      case(Structure.Road): this.gameService.buildStructure = Structure.Road; break;
      case(Structure.Ship): this.gameService.buildStructure = Structure.Ship; break;
    }
  }

  checkEdge(edge: EdgeComponent, vertex: VertexComponent, meta: Meta, initialPut: boolean, prohibited: Structure): boolean{
    let ret = false;
    if (+edge.edge.building === +prohibited && +edge.edge.owner_id === +meta.PID ||
         initialPut && edge.edge.building === null){
      if (+vertex.vertex.owner_id === +meta.PID){
        ret = true;
      }else{
        if (initialPut){
          console.log('You need to place it next to your settlement');
        }else{
          console.log('You cant change from ship to road (or vice versa) without settlement in between');
        }
      }
    }else if (+edge.edge.building === +this.gameService.buildStructure && +edge.edge.owner_id === +meta.PID){
      ret = true;
    }
    return ret;
  }

  cancelBuilding(): void{
    if (this.gameService.edge_blueprint){
      this.gameService.edge_blueprint.ship = false;
      this.gameService.edge_blueprint.street = false;
      this.gameService.edge_blueprint = null;
    }
    if (this.gameService.vert_blueprint){
      if (this.gameService.vert_blueprint.city === true){
        this.gameService.vert_blueprint.city = false;
        this.gameService.vert_blueprint.settlement = true;
        this.gameService.vert_blueprint = null;
      }else{
        this.gameService.vert_blueprint.settlement = false;
        this.gameService.vert_blueprint = null;
      }
    }
  }

  // Traderequest amount resources in view of trade issuer
  submitTradeRequest(): void {
    // TODO open the dialog
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      data: {
        brick: 0,
        lumber: 0,
        wool: 0,
        grain: 0,
        ore: 0,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.gameService.request_trade({brick: +result.brick,
                                       lumber: +result.lumber,
                                       wool: +result.wool,
                                       grain: +result.grain,
                                       ore: +result.ore}).subscribe();
      }
    });
  }

  acceptTradeRequest(): void{
    this.gameService.accept_trade().subscribe();
  }

  abs(int: number): number {
    return Math.abs(int);
  }

  PIDtoName(PID: number): string {
    if (PID === 1){
      return 'Bank';
    }
    else{
      let ret = null;
      this.gameService.gameObject.players.forEach(value => {
        if (value.PID === PID){
          ret = value.name;
        }
      });
      return ret;
    }
  }

  executeTrade(partner: number): void {
    this.gameService.choose_trade_partner(partner).subscribe();
  }

  cancelTrade(): void {
    this.gameService.cancel_trade().subscribe();
  }
}

export interface DialogData {
  brick: number;
  lumber: number;
  wool: number;
  grain: number;
  ore: number;
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
