import {Component, Input, OnInit} from '@angular/core';
import {Hex} from '../../../../model/Hex';
import {throwError} from 'rxjs';
import {hexToAdjEdges} from '../../../translator';
import {GameService} from '../../game.service';
import {CreationService} from '../../../creation/creation.service';
import {HexType} from '../../../../model/HexType';
import {Resource} from '../../../../model/Resource';
import {Harbour} from '../../../../model/Harbour';
import {HarbourType} from '../../../../model/HarbourType';


@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-hex]',
  templateUrl: './hex.component.svg',
  styleUrls: ['./hex.component.css']
})
export class HexComponent implements OnInit {

  @Input()
  hex: Hex;
  @Input()
  onClickFun: any;
  @Input()
  harbours;

  gameService: GameService;
  creationService: CreationService;
  x_center = 50;
  y_center = 50;
  // points = '300,150 225,280 75,280 0,150 75,20 225,20';
  points = '';
  points2 = '';
  fillColor = 'rgb(255, 0, 0)';
  cood: string;
  harbour = {ne: null, e: null, se: null, sw: null, w: null, nw: null};
  ne_points: any = null;
  e_points: any = null;
  se_points: any = null;
  sw_points: any = null;
  w_points: any = null;
  nw_points: any = null;
  ne_harbour_colour = 'rgb(0, 0, 0)';
  e_harbour_colour = 'rgb(0, 0, 0)';
  se_harbour_colour = 'rgb(0, 0, 0)';
  sw_harbour_colour = 'rgb(0, 0, 0)';
  nw_harbour_colour = 'rgb(0, 0, 0)';
  w_harbour_colour = 'rgb(0, 0, 0)';
  col_white = 'rgb(255, 255, 255)';
  circ_rad = Hex.side / 2;
  water = HexType.Water;

  changeColor(): void {
    switch (+this.hex.type){
      case HexType.Brick: this.fillColor = `rgb(255, 130, 0)`; break;
      case HexType.Lumber: this.fillColor = `rgb(35, 140, 35)`; break;
      case HexType.Wool: this.fillColor = `rgb(150, 250, 150)`; break;
      case HexType.Grain: this.fillColor = `rgb(255, 255, 10)`; break;
      case HexType.Ore: this.fillColor = `rgb(80, 80, 80)`; break;
      case HexType.Gold: this.fillColor = `rgb(150, 0, 150)`; break;
      case HexType.Water: this.fillColor = `rgb(0, 60, 200)`; break;
      default: this.fillColor = `rgb(255, 0, 0)`; break;
    }
  }

  getColor(choosenHarbour: HarbourType): string {
    switch (+choosenHarbour){
      case HarbourType.Brick: return `rgb(255, 200, 0)`;
      case HarbourType.Lumber: return `rgb(50, 170, 60)`;
      case HarbourType.Wool: return `rgb(190, 255, 190)`;
      case HarbourType.Grain: return `rgb(255, 255, 100)`;
      case HarbourType.Ore: return `rgb(110, 110, 110)`;
      case HarbourType.TTO: return `rgb(250,250,250)`;
      default: return `rgb(255, 0, 0)`;
    }
  }

  // Warning: Since the svg coordinates are inverted on the Y-Achis, subtraction <=> addition on Y values for drawing
  changeHarbours(direction: string, x: number, y: number): void{
    if (direction === 'ne'){
      if (this.ne_points !== null){
        if (+this.creationService.choosenHarbour === +this.harbour.ne){
          this.ne_points = null;
          this.removeHarbour(x, y);
        }else{
          this.drawNeHarbour(this.creationService.choosenHarbour);
          // Placing other resource on it => only change type of harbour
          this.changeHarbourType(x, y);
        }
      }else{
        this.drawNeHarbour(this.creationService.choosenHarbour);
        this.creationService.harbours.push( new Harbour(x, y, this.creationService.choosenHarbour));
      }
    }else if (direction === 'e'){
      if (this.e_points !== null){
        if (+this.creationService.choosenHarbour === +this.harbour.e){
          this.e_points = null;
          this.removeHarbour(x, y);
        }else{
          this.drawEHarbour(this.creationService.choosenHarbour);
          this.changeHarbourType(x, y);
        }
      }else{
        this.drawEHarbour(this.creationService.choosenHarbour);
        this.creationService.harbours.push( new Harbour(x, y, this.creationService.choosenHarbour));
      }
    }else if (direction === 'se'){
      if (this.se_points !== null){
        if (+this.creationService.choosenHarbour === +this.harbour.se) {
          this.se_points = null;
          this.removeHarbour(x, y);
        }else{
          this.drawSeHarbour(this.creationService.choosenHarbour);
          this.changeHarbourType(x, y);
        }
      }else{
        this.drawSeHarbour(this.creationService.choosenHarbour);
        this.creationService.harbours.push( new Harbour(x, y, this.creationService.choosenHarbour));
      }
    }else if (direction === 'sw'){
      if (this.sw_points !== null){
        if (+this.creationService.choosenHarbour === +this.harbour.sw) {
          this.sw_points = null;
          this.removeHarbour(x, y);
        }else{
          this.drawSwHarbour(this.creationService.choosenHarbour);
          this.changeHarbourType(x, y);
        }
      }else{
        this.drawSwHarbour(this.creationService.choosenHarbour);
        this.creationService.harbours.push( new Harbour(x, y, this.creationService.choosenHarbour));
      }
    }else if (direction === 'w'){
      if (this.w_points !== null){
        if (+this.creationService.choosenHarbour === +this.harbour.w) {
          this.w_points = null;
          this.removeHarbour(x, y);
        }else{
          this.drawWHarbour(this.creationService.choosenHarbour);
          this.changeHarbourType(x, y);
        }
      }else {
        this.drawWHarbour(this.creationService.choosenHarbour);
        this.creationService.harbours.push(new Harbour(x, y, this.creationService.choosenHarbour));
      }
    }else if (direction === 'nw'){
      if (this.nw_points !== null){
        if (+this.creationService.choosenHarbour === +this.harbour.nw) {
          this.nw_points = null;
          this.removeHarbour(x, y);
        }else{
          this.drawNwHarbour(this.creationService.choosenHarbour);
          this.changeHarbourType(x, y);
        }
      }else {
        this.drawNwHarbour(this.creationService.choosenHarbour);
        this.creationService.harbours.push(new Harbour(x, y, this.creationService.choosenHarbour));
      }
    }
    console.log(this.creationService.harbours);
  }

  ngOnInit(): void {
    if (this.hex === null) {
      throwError('hex is required attribute');
      this.cood = '';
    } else {
      // Draw Hex itself
      this.x_center += this.hex.x * Math.sqrt(3) * Hex.side;
      if (this.hex.y % 2 === 0){ this.x_center += Math.sqrt(3) / 2 * Hex.side; }
      this.y_center += this.hex.y * 3 / 2 * Hex.side;
      this.points = `${this.x_center},${this.y_center + Hex.side} \
                      ${this.x_center + (Math.sqrt(3) / 2) * Hex.side},${this.y_center + Hex.side / 2} \
                      ${this.x_center + (Math.sqrt(3) / 2) * Hex.side},${this.y_center - Hex.side / 2} \
                      ${this.x_center},${this.y_center - Hex.side} \
                      ${this.x_center - (Math.sqrt(3) / 2) * Hex.side},${this.y_center - Hex.side / 2} \
                      ${this.x_center - (Math.sqrt(3) / 2) * Hex.side},${this.y_center + Hex.side / 2}`;
      this.cood = `(${this.hex.x},${this.hex.y})`;
      this.changeColor();
      if (this.gameService && this.gameService.hex_comps){
        this.gameService.hex_comps[this.hex.x][this.hex.y] = this;
      }
    }
    // Draw Harbours on hex
    const adj_edges = hexToAdjEdges(this.hex);
    if (this.hex.type === HexType.Water) {
      if (this.harbours) {
        const direction: number[] = [];
        this.harbours = this.harbours.filter(h => {
          for (let j = 0; j < 6; j++) {
            if (h.x === adj_edges[j][0] && h.y === adj_edges[j][1]) {
              direction.push(j);
              return true;
            }
          }
          return false;
        });
        let i = 0;
        for (const h of this.harbours) {
          switch (direction[i]){
            case(0): this.drawNeHarbour(h.resource); break;
            case(1): this.drawEHarbour(h.resource); break;
            case(2): this.drawSeHarbour(h.resource); break;
            case(3): this.drawSwHarbour(h.resource); break;
            case(4): this.drawWHarbour(h.resource); break;
            case(5): this.drawNwHarbour(h.resource); break;
            default: console.log(`Investigate pls`); break;
          }
          i++;
        }
      }
    }
  }

  constructor(gameService: GameService, creationService: CreationService) {
    this.gameService = gameService;
    this.creationService = creationService;
  }

  drawNeHarbour(res: HarbourType): void{
    this.harbour.ne = res;
    this.ne_points = `${this.x_center},${this.y_center - Hex.side} \
                      ${this.x_center + (Math.sqrt(3) / 2) * Hex.side},${this.y_center - Hex.side / 2} \
                      ${this.x_center},${this.y_center}`;
    this.ne_harbour_colour = this.getColor(this.harbour.ne);
  }

  drawEHarbour(res: HarbourType): void{
    this.harbour.e = res;
    this.e_points = `${this.x_center + (Math.sqrt(3) / 2) * Hex.side},${this.y_center - Hex.side / 2} \
                      ${this.x_center + (Math.sqrt(3) / 2) * Hex.side},${this.y_center + Hex.side / 2} \
                      ${this.x_center},${this.y_center}`;
    this.e_harbour_colour = this.getColor(this.harbour.e);
  }

  drawSeHarbour(res: HarbourType): void{
    this.harbour.se = res;
    this.se_points = `${this.x_center + (Math.sqrt(3) / 2) * Hex.side},${this.y_center + Hex.side / 2} \
                      ${this.x_center},${this.y_center + Hex.side} \
                      ${this.x_center},${this.y_center}`;
    this.se_harbour_colour = this.getColor(this.harbour.se);
  }

  drawSwHarbour(res: HarbourType): void{
    this.harbour.sw = res;
    this.sw_points = `${this.x_center},${this.y_center + Hex.side} \
                        ${this.x_center - (Math.sqrt(3) / 2) * Hex.side},${this.y_center + Hex.side / 2} \
                        ${this.x_center},${this.y_center}`;
    this.sw_harbour_colour = this.getColor(this.harbour.sw);
  }

  drawWHarbour(res: HarbourType): void{
    this.harbour.w = res;
    this.w_points = `${this.x_center - (Math.sqrt(3) / 2) * Hex.side},${this.y_center + Hex.side / 2} \
                      ${this.x_center - (Math.sqrt(3) / 2) * Hex.side},${this.y_center - Hex.side / 2} \
                      ${this.x_center},${this.y_center}`;
    this.w_harbour_colour = this.getColor(this.harbour.w);
  }

  drawNwHarbour(res: HarbourType): void{
    this.harbour.nw = res;
    this.nw_points = `${this.x_center},${this.y_center - Hex.side}\
                        ${this.x_center - (Math.sqrt(3) / 2) * Hex.side},${this.y_center - Hex.side / 2} \
                      ${this.x_center},${this.y_center}`;
    this.nw_harbour_colour = this.getColor(this.harbour.nw);
  }

  changeHarbourType(x: number, y: number): void{
    this.creationService.harbours.map(h => {
      if (h.x !== x || h.y !== y){
        return h;
      }else{
        h.resource = this.creationService.choosenHarbour;
        return h;
      }
    });
  }

  removeHarbour(x: number, y: number): void{
    this.creationService.harbours = this.creationService.harbours.filter(h => h.x !== x || h.y !== y);
  }
}
