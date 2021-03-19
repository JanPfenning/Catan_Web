import {Component, OnChanges, OnInit} from '@angular/core';
import {CreationService} from '../creation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LobbyService} from '../../lobby/lobby.service';
import {Hex} from '../../../model/Hex';
import {HexType} from '../../../model/HexType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {hexToAdjEdges, hexToAdjHexes, pointInTriangle} from '../../translator';
import {HarbourType} from '../../../model/HarbourType';
import {Resource} from '../../../model/Resource';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  hexTypeChoose: FormGroup;
  uiChoose: FormGroup;
  harbourChoose: FormGroup;
  ui: 'resources'|'harbours'|'numbers' = 'resources';
  onHexClick = this.changeType;
  balancedFields = true;
  creationService: CreationService;
  // hexes: Hex[][] = [];
  private lobbyService: LobbyService;

  brick = HexType.Brick;
  lumber = HexType.Lumber;
  wool = HexType.Wool;
  grain = HexType.Grain;
  ore = HexType.Ore;
  gold = HexType.Gold;
  water = HexType.Water;

  brick_harbour = HarbourType.Brick;
  lumber_harbour = HarbourType.Lumber;
  wool_harbour = HarbourType.Wool;
  grain_harbour = HarbourType.Grain;
  ore_harbour = HarbourType.Ore;
  TTO = HarbourType.TTO;

  placedNumbers: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  numberLabels: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  placedTypes: number[] = [0, 0, 0, 0, 0];
  typeLabels: string[] = ['Brick', 'Lumber', 'Wool', 'Grain', 'Ore'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    creationService: CreationService,
    lobbyService: LobbyService,
    fb: FormBuilder,
  ){
    this.lobbyService = lobbyService;
    this.creationService = creationService;

    this.uiChoose = fb.group({ui: ['', Validators.required]});
    this.uiChoose.get('ui').setValue('resources');
    this.hexTypeChoose = fb.group({hextype: ['', Validators.required]});
    this.hexTypeChoose.get('hextype').patchValue(this.brick.toString());
    this.harbourChoose = fb.group({harbourtype: ['', Validators.required]});
    this.harbourChoose.get('harbourtype').patchValue(this.TTO.toString());
    this.toggleUI();
    this.updateHarbour();
    this.updateHexType();
  }

  ngOnInit(): void {
    this.ui = 'resources';
    this.creationService.hexes = [];
    for (let i = 0; i < this.creationService.boardWidth; i++) {
      this.creationService.hexes[i] = [];
      for (let j = 0; j < this.creationService.boardHeight; j++) {
        this.creationService.hexes[i][j] = new Hex(i, j, 8, HexType.Water);
      }
    }
  }

  updateTypes(): void{
    const types = [];
    this.creationService.hexes.forEach(line => {
      line.forEach(hex => {
        if (+hex.type !== +HexType.Water){
          types.push(+hex.type);
        }
      });
    });
    const placedTypes = [];
    for (let i = 0; i <= 5 ; i++) {
      placedTypes[i] = types.filter(numb => numb === i).length;
    }
    this.placedTypes = placedTypes;
  }

  updateNumbers(): void{
    const numbers = [];
    this.creationService.hexes.forEach(line => {
      line.forEach(hex => {
        if (+hex.type !== +HexType.Water){
          numbers.push(+hex.nr);
        }
      });
    });
    const placedNumbers = [];
    for (let i = 0; i <= 12 ; i++) {
      placedNumbers[i] = numbers.filter(numb => numb === i).length;
    }
    this.placedNumbers = placedNumbers;
  }

  randomPlaceNumbers(): void{
    const numberSet = [];
    const hexes = [];
    this.creationService.hexes.forEach(line => {
      line.forEach(hex => {
        if (+hex.type !== +HexType.Water){
          hexes.push(hex);
        }
      });
    });
    for (let i = 0; i < Math.ceil(hexes.length / 10); i++) {
      numberSet.push(2, 3, 4, 5, 6, 8, 9, 10, 11, 12);
    }
    let j;
    let x;
    for (let i = numberSet.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = numberSet[i];
      numberSet[i] = numberSet[j];
      numberSet[j] = x;
    }
    hexes.forEach(hex => {
      hex.nr = numberSet.pop();
    });
    this.updateNumbers();
  }

  // Higher order function to be provided in hex svg
  changeType(): void{
    // @ts-ignore
    const adj_edges = hexToAdjEdges(this.hex);
    let harbourClose = false;
    this.creationService.harbours.forEach(harbour => {
      for (let i = 0; i <= 5; i++) {
        if (harbour.x === adj_edges[i][0] && harbour.y === adj_edges[i][1]){
          harbourClose = true;
        }
      }
    });
    if (!harbourClose){
      // @ts-ignore
      this.hex.type = this.creationService.choosenHexType;
      // @ts-ignore
      this.changeColor();
    }
  }

  // Higher order function to be provided in hex svg
  changeNumber(): void{
    // @ts-ignore
    console.log(this.hex.nr);
    // @ts-ignore
    this.hex.nr = this.creationService.choosenNumber;
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

  // TODO on adjust height recalculate height of svg
  updateWidth($event: any): void {
    const dif = $event.target.value - this.creationService.boardWidth;
    if (dif > 0){
      this.expandW(dif);
    }else{
      this.shrinkW(dif);
    }
    this.creationService.boardWidth = +$event.target.value;
    console.log(`new width: ${this.creationService.boardWidth}`);
    // this.creationService.hexes = JSON.parse(JSON.stringify(this.creationService.hexes));
  }

  updateHeight($event: any): void {
    const dif = $event.target.value - this.creationService.boardHeight;
    if (dif > 0){
      this.expandH(dif);
    }else{
      this.shrinkH(dif);
    }
    this.creationService.boardHeight = +$event.target.value;
    // console.log(`new height: ${this.creationService.boardHeight}`);
  }

  // TODO actively destroy the svg hexes that are lost
  shrinkW(dif: number): void{
    console.log(`${dif} columns -> shrink`);
    for (let x = this.creationService.boardWidth + dif; x > this.creationService.boardWidth ; x--) {
      for (let y = 0; y < this.creationService.boardHeight; y++) {
        this.creationService.hexes[x][y] = null;
      }
    }
  }

  expandW(dif: number): void{
    console.log(`${dif} columns -> expand`);
    for (let x = this.creationService.boardWidth; x < this.creationService.boardWidth + dif; x++) {
      this.creationService.hexes[x] = [];
      for (let y = 0; y < this.creationService.boardHeight; y++) {
        this.creationService.hexes[x][y] = new Hex(x, y, 7, HexType.Water);
      }
    }
  }

  // TODO actively destroy the svg hexes that are lost
  shrinkH(dif: number): void{
    console.log(`${dif} rows -> shrink`);
    for (let x = 0; x < this.creationService.boardWidth ; x++) {
      for (let y = this.creationService.boardHeight + dif; y > this.creationService.boardHeight; y--) {
        this.creationService.hexes[x][y] = null;
      }
    }
  }

  expandH(dif: number): void{
    console.log(`${dif} columns -> expand`);
    console.log(this.creationService.hexes[0].length);
    for (let x = 0; x < this.creationService.boardWidth ; x++) {
      console.log(`cur: ${this.creationService.boardHeight} to:${this.creationService.boardHeight + dif} (dif: ${dif})`);
      for (let y = this.creationService.boardHeight; y < this.creationService.boardHeight + dif; y++) {
        try{
          this.creationService.hexes[x][y] = new Hex(x, y, 7, HexType.Water);
        }catch (e){
          console.log(`error @ hexes[${x}][${y}]`);
          console.log(e);
        }
      }
    }
    console.log(this.creationService.hexes[0].length);
  }

  updateHexType(): void {
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
    this.creationService.choosenHarbour = this.harbourChoose.get('harbourtype').value;
    switch (this.harbourChoose.get('harbourtype').value){
      case(HarbourType.Brick): this.creationService.choosenHarbour = HarbourType.Brick; break;
      case(HarbourType.Lumber): this.creationService.choosenHarbour = HarbourType.Lumber; break;
      case(HarbourType.Wool): this.creationService.choosenHarbour = HarbourType.Wool; break;
      case(HarbourType.Grain): this.creationService.choosenHarbour = HarbourType.Grain; break;
      case(HarbourType.Ore): this.creationService.choosenHarbour = HarbourType.Ore; break;
      case(HarbourType.TTO): this.creationService.choosenHarbour = HarbourType.TTO; break;
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

  // TODO !DEBUG first interaction has no impact until random place resources has been pressed once
  interact($event: MouseEvent): void {
    this.updateNumbers();
    this.updateTypes();
    if (this.ui === 'harbours'){
      this.placeHarbour($event);
    }
  }

  updateNumber($event: Event): void{
    // @ts-ignore
    const val = $event.target.value;
    if (+val !== 7 && +val >= 2 && +val <= 12){
      this.creationService.choosenNumber = val;
    }else{
      // @ts-ignore
      $event.target.value = this.creationService.choosenNumber;
    }
    console.log(this.creationService.choosenNumber);
  }

  randomPlaceResources(): void {
    const resourcesSet = [];
    const hexes = [];
    this.creationService.hexes.forEach(line => {
      line.forEach(hex => {
        console.log(hex);
        if (+hex.type !== +HexType.Water){
          hexes.push(hex);
        }
      });
    });
    for (let i = 0; i < Math.ceil(hexes.length / 5); i++) {
      resourcesSet.push(Resource.Lumber, Resource.Brick, Resource.Wool, Resource.Grain, Resource.Ore);
    }
    let j;
    let x;
    for (let i = resourcesSet.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = resourcesSet[i];
      resourcesSet[i] = resourcesSet[j];
      resourcesSet[j] = x;
    }
    hexes.forEach(hex => {
      hex.type = resourcesSet.pop();
      console.log(hex);
    });
    this.creationService.hexes = JSON.parse(JSON.stringify(this.creationService.hexes));
    this.updateTypes();
  }
}
