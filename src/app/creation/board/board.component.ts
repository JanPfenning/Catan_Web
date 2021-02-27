import {Component, OnInit} from '@angular/core';
import {CreationService} from '../creation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LobbyService} from '../../lobby/lobby.service';
import {Hex} from '../../../model/Hex';
import {HexType} from '../../../model/HexType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {hexToAdjEdges, hexToAdjHexes, pointInTriangle} from '../../translator';
import {Resource} from '../../../model/Resource';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
// TODO generate random map
export class BoardComponent implements OnInit {

  hexTypeChoose: FormGroup;
  uiChoose: FormGroup;
  harbourChoose: FormGroup;
  ui = 'resources';
  onHexClick = this.getHexPosition;
  randomBoard = false;
  balancedFields = true;
  creationService: CreationService;
  hexes: Hex[][] = [];
  private lobbyService: LobbyService;

  brick = HexType.Brick;
  lumber = HexType.Lumber;
  wool = HexType.Wool;
  grain = HexType.Grain;
  ore = HexType.Ore;
  gold = HexType.Gold;
  water = HexType.Water;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    creationService: CreationService,
    lobbyService: LobbyService,
    fb: FormBuilder,
  ){
    this.lobbyService = lobbyService;
    this.creationService = creationService;

    this.hexTypeChoose = fb.group({hextype: ['', Validators.required]});
    this.uiChoose = fb.group({ui: ['', Validators.required]});
    this.harbourChoose = fb.group({harbourtype: ['', Validators.required]});
  }

  ngOnInit(): void {
    this.ui = 'resource';
    this.creationService.hexes = [];
    for (let i = 0; i < this.creationService.boardWidth; i++) {
      this.creationService.hexes[i] = [];
      for (let j = 0; j < this.creationService.boardHeight; j++) {
        this.creationService.hexes[i][j] = new Hex(i, j, 7, HexType.Water);
      }
    }
  }

  randomBoardToggle(): void {
    this.randomBoard = !this.randomBoard;
  }

  // Higher order function to be provided in hex svg
  changeType(): void{
    // @ts-ignore
    console.log(this.hex.type);
    // @ts-ignore
    this.hex.type = this.creationService.choosenHexType;
    // @ts-ignore
    this.changeColor();
    // TODO if changed to water, check if harbours have to be deleted
  }

  // Higher order function to be provided in hex svg
  changeNumber(): void{
    // @ts-ignore
    console.log(this.hex.nr);
    // @ts-ignore
    this.hex.nr = this.creationService.choosenNumber;
    // @ts-ignore
    // this.changeColor();
  }

  // Higher order function to be provided in hex svg
  getHexPosition(): void{
    // @ts-ignore
    this.creationService.cur_hex_comp = this;
  }

  /**
   * Dont know why but this works: https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
   * @param $event magic value of angular click
   */
  placeHarbour($event): void{
    if (this.creationService.cur_hex_comp.hex.type === HexType.Water){
      const rcx = $event.offsetX - this.creationService.cur_hex_comp.x_center;
      const rcy = this.creationService.cur_hex_comp.y_center - $event.offsetY;
      const rc = {x: rcx, y: rcy};
      const center = {x: 0, y: 0};
      const n = {x: 0, y: Hex.side};
      const ne = {x: (Math.sqrt(3) / 2) * Hex.side, y: Hex.side / 2};
      const se = {x: (Math.sqrt(3) / 2) * Hex.side, y: Hex.side / -2};
      const s = {x: 0, y: -Hex.side};
      const sw = {x: (Math.sqrt(3) / 2) * -Hex.side, y: Hex.side / -2};
      const nw = {x: (Math.sqrt(3) / 2) * -Hex.side, y: Hex.side / 2};

      const adj_edges = hexToAdjEdges(this.creationService.cur_hex_comp.hex);
      const adj_hexes = hexToAdjHexes(this.creationService.cur_hex_comp.hex);
      if (pointInTriangle(rc, center, n, ne) && this.creationService.hexes[adj_hexes[0][0]][adj_hexes[0][1]].type !== HexType.Water){
        console.log('ne harbour');
        this.creationService.cur_hex_comp.changeHarbours('ne', adj_edges[0][0], adj_edges[0][1]);
      }else if (pointInTriangle(rc, center, ne, se) && this.creationService.hexes[adj_hexes[1][0]][adj_hexes[1][1]].type !== HexType.Water){
        console.log('e harbour');
        this.creationService.cur_hex_comp.changeHarbours('e', adj_edges[1][0], adj_edges[1][1]);
      }else if (pointInTriangle(rc, center, se, s) && this.creationService.hexes[adj_hexes[2][0]][adj_hexes[2][1]].type !== HexType.Water){
        console.log('se harbour');
        this.creationService.cur_hex_comp.changeHarbours('se', adj_edges[2][0], adj_edges[2][1]);
      }else if (pointInTriangle(rc, center, s, sw) && this.creationService.hexes[adj_hexes[3][0]][adj_hexes[3][1]].type !== HexType.Water){
        console.log('sw harbour');
        this.creationService.cur_hex_comp.changeHarbours('sw', adj_edges[3][0], adj_edges[3][1]);
      }else if (pointInTriangle(rc, center, sw, nw) && this.creationService.hexes[adj_hexes[4][0]][adj_hexes[4][1]].type !== HexType.Water){
        console.log('w harbour');
        this.creationService.cur_hex_comp.changeHarbours('w', adj_edges[4][0], adj_edges[4][1]);
      }else if (pointInTriangle(rc, center, nw, n) && this.creationService.hexes[adj_hexes[5][0]][adj_hexes[5][1]].type !== HexType.Water){
        console.log('nw harbour');
        this.creationService.cur_hex_comp.changeHarbours('nw', adj_edges[5][0], adj_edges[5][1]);
      }else{
        // return -1;
      }
    }
  }

  back(): void{
    this.router.navigate(['rules'], {relativeTo: this.route.parent});
  }

  publishGame(): void {
    this.creationService.createGame().subscribe(val => {
      this.lobbyService.id = val;
      this.router.navigate(['join'], {state: {id: val.toString()}});
    });
  }

  updateWidth($event: any): void {
    const dif = $event.target.value - this.creationService.boardWidth;
    if (dif > 0){
      this.expandW(dif);
    }else{
      this.shrinkW(dif);
    }
    this.creationService.boardWidth = $event.target.value;
    console.log(`new width: ${this.creationService.boardWidth}`);
  }

  updateHeight($event: any): void {
    const dif = $event.target.value - this.creationService.boardHeight;
    if (dif > 0){
      this.expandH(dif);
    }else{
      this.shrinkH(dif);
    }
    this.creationService.boardHeight = $event.target.value;
    console.log(`new height: ${this.creationService.boardHeight}`);
  }

  // TODO fix
  shrinkW(dif: number): void{
    console.log(`${dif} columns -> shrink`);
    for (let x = 0; x < this.creationService.boardWidth ; x++) {
      for (let y = 0; y < this.creationService.boardHeight; y++) {
        if (x >= this.creationService.boardWidth + dif){
          this.creationService.hexes[x][y] = null;
        }
      }
    }
  }

  // TODO fix
  expandW(dif: number): void{
    console.log(`${dif} columns -> expand`);
    for (let x = this.creationService.boardWidth; x < this.creationService.boardWidth + dif; x++) {
      this.creationService.hexes[x] = [];
      for (let y = 0; y < this.creationService.boardHeight; y++) {
        this.creationService.hexes[x][y] = new Hex(x, y, 7, HexType.Water);
      }
    }
  }

  // TODO fix
  shrinkH(dif: number): void{
    console.log(`${dif} rows -> shrink`);
    for (let x = 0; x < this.creationService.boardWidth ; x++) {
      for (let y = 0; y < this.creationService.boardHeight; y++) {
        if (y >= this.creationService.boardHeight + dif){
          this.creationService.hexes[x][y] = null;
        }
      }
    }
  }

  // TODO fix
  expandH(dif: number): void{
    console.log(`${dif} columns -> expand`);
    console.log(this.creationService.hexes);
    for (let x = 0; x < this.creationService.boardWidth ; x++) {
      for (let y = this.creationService.boardHeight; y < this.creationService.boardHeight + dif; y++) {
        try{
          this.creationService.hexes[x][y] = new Hex(x, y, 7, HexType.Water);
        }catch (e){
          console.log(`error @ hexes[${x}][${y}]`);
          console.log(e);
        }
      }
    }
  }

  updateHexType(): void {
    console.log(`value of radio: ${this.hexTypeChoose.get('hextype').value}`);
    this.creationService.choosenHexType = this.hexTypeChoose.get('hextype').value;
    switch (this.hexTypeChoose.get('hextype').value){
      case(0): this.creationService.choosenHexType = HexType.Brick; break;
      case(1): this.creationService.choosenHexType = HexType.Lumber; break;
      case(2): this.creationService.choosenHexType = HexType.Wool; break;
      case(3): this.creationService.choosenHexType = HexType.Grain; break;
      case(4): this.creationService.choosenHexType = HexType.Ore; break;
      case(5): this.creationService.choosenHexType = HexType.Gold; break;
      case(6): this.creationService.choosenHexType = HexType.Water; break;
      case(7): this.creationService.choosenHexType = HexType.Desert; break;
    }
  }

  updateHarbour(): void {
    console.log(`value of radio: ${this.harbourChoose.get('harbourtype').value}`);
    this.creationService.choosenHarbour = this.harbourChoose.get('harbourtype').value;
    switch (this.harbourChoose.get('harbourtype').value){
      case(0): this.creationService.choosenHarbour = Resource.Brick; break;
      case(1): this.creationService.choosenHarbour = Resource.Lumber; break;
      case(2): this.creationService.choosenHarbour = Resource.Wool; break;
      case(3): this.creationService.choosenHarbour = Resource.Grain; break;
      case(4): this.creationService.choosenHarbour = Resource.Ore; break;
    }
  }

  toggleUI(): void {
    console.log(`value of radio: ${this.uiChoose.get('ui').value}`);
    this.ui = this.uiChoose.get('ui').value;
    switch (this.ui){
      case('resources'): this.onHexClick = this.changeType; break;
      case('harbours'): this.onHexClick = this.getHexPosition; break;
      case('numbers'): this.onHexClick = this.changeNumber; break;
      default: break;
    }
  }

  interact($event: MouseEvent): void {
    if (this.ui === 'harbours'){
      this.placeHarbour($event);
    }
  }
}
