import {AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Hex} from '../../../../model/Hex';
import {vertexToAdjHexes} from '../../../translator';
import {GameService} from '../../game.service';
import {HexComponent} from '../hex/hex.component';
import {executionAsyncResource} from 'async_hooks';
import {Structure} from '../../../../model/Structure';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-vertex]',
  templateUrl: './vertex.component.svg',
  styleUrls: ['./vertex.component.css'],
})
export class VertexComponent implements OnInit{

  @Input()
  vertex;

  cy = 0;
  cx = 0;
  gameService: GameService;
  color = `rgb(0, 0, 0)`;
  r = Hex.side / 2;

  x1 = -10 / 25 * Hex.side;
  y1 = 0 / 25 * Hex.side;
  x2 = 0 / 25 * Hex.side;
  y2 = 0 / 25 * Hex.side;
  x3 = 0 / 25 * Hex.side;
  y3 = -5 / 25 * Hex.side;
  x4 = 5 / 25 * Hex.side;
  y4 = -10 / 25 * Hex.side;
  x5 = 10 / 25 * Hex.side;
  y5 = -5 / 25 * Hex.side;
  x6 = 10 / 25 * Hex.side;
  y6 = 10 / 25 * Hex.side;
  x7 = -10 / 25 * Hex.side;
  y7 = 10 / 25 * Hex.side;
  cityPoints;

  settle_x1 = -5;
  settle_y1 = -2.5;
  settle_x2 = 0;
  settle_y2 = -7.5;
  settle_x3 = 5;
  settle_y3 = -2.5;
  settle_x4 = 5;
  settle_y4 = 7.5;
  settle_x5 = -5;
  settle_y5 = 7.5;
  settlementPoints;

  settlement = false;
  city = false;
  gold = `rgb(255, 215, 0)`;

  constructor(gameService: GameService, public ref: ChangeDetectorRef) {
    this.gameService = gameService;
  }

  ngOnInit(): void {
    const adj_hexes = vertexToAdjHexes(this.vertex);
    if (this.vertex.building !== null && +this.vertex.building === +Structure.Settlement){
      this.settlement = true;
    }
    if (+this.vertex.building === +Structure.City){
      this.city = true;
    }
    let west_hex;
    try{
      west_hex = this.gameService.hex_comps[adj_hexes[0][0]][adj_hexes[0][1]];
    }catch (e){
      west_hex = null;
    }
    let east_hex;
    try{
      east_hex = this.gameService.hex_comps[adj_hexes[1][0]][adj_hexes[1][1]];
    }catch (e) {
      east_hex = null;
    }
    let vert_hex;
    try{
      vert_hex = this.gameService.hex_comps[adj_hexes[2][0]][adj_hexes[2][1]];
    }catch (e) {
      vert_hex = null;
    }
    if (this.vertex.x % 2 === 0) {
      if (this.vertex.y % 4 === 0) {
        if (west_hex) {
          this.placeSE(west_hex);
        } else if (east_hex) {
          this.placeSW(east_hex);
        } else if (vert_hex){
          this.placeN(vert_hex);
        }
      }else if ((this.vertex.y + 1) % 4 === 0) {
        if (west_hex) {
          this.placeNE(west_hex);
        }else if (east_hex){
          this.placeNW(east_hex);
        }
      }
    }
    else{
      if ((this.vertex.y + 3) % 4 === 0){
        if (west_hex) {
          this.placeNE(west_hex);
        }else if (east_hex) {
          this.placeNW(east_hex);
        }else if (vert_hex) {
          this.placeS(vert_hex);
        }
      }else if ((this.vertex.y + 2) % 4 === 0){
        if (west_hex) {
          this.placeSE(west_hex);
        }else if (east_hex) {
          this.placeSW(east_hex);
        }
      }
    }
    if (this.vertex.owner_id !== null){
      // console.log(this);
    }
    this.gameService.vert_comps[this.vertex.x][this.vertex.y] = this;
    this.gameService.gameObject.players.forEach(player => {
      // console.log(player);
      if (player.PID === this.vertex.owner_id){
        this.color = player.colour;
      }
    });
  }

  placeN(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center;
    this.cy = ref_hex_comp.y_center - Hex.side;
    this.settlementPoints = `${this.cx + this.settle_x1}, ${this.cy + this.settle_y1}
                             ${this.cx + this.settle_x2}, ${this.cy + this.settle_y2}
                             ${this.cx + this.settle_x3}, ${this.cy + this.settle_y3}
                             ${this.cx + this.settle_x4}, ${this.cy + this.settle_y4}
                             ${this.cx + this.settle_x5}, ${this.cy + this.settle_y5}`;
    this.cityPoints = `${this.cx + this.x1}, ${this.cy + this.y1}
                       ${this.cx + this.x2}, ${this.cy + this.y2}
                       ${this.cx + this.x3}, ${this.cy + this.y3}
                       ${this.cx + this.x4}, ${this.cy + this.y4}
                       ${this.cx + this.x5}, ${this.cy + this.y5}
                       ${this.cx + this.x6}, ${this.cy + this.y6}
                       ${this.cx + this.x7}, ${this.cy + this.y7}`;
  }

  placeNE(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center + (Math.sqrt(3) / 2) * Hex.side;
    this.cy = ref_hex_comp.y_center - Hex.side / 2;
    this.settlementPoints = `${this.cx + this.settle_x1}, ${this.cy + this.settle_y1}
                             ${this.cx + this.settle_x2}, ${this.cy + this.settle_y2}
                             ${this.cx + this.settle_x3}, ${this.cy + this.settle_y3}
                             ${this.cx + this.settle_x4}, ${this.cy + this.settle_y4}
                             ${this.cx + this.settle_x5}, ${this.cy + this.settle_y5}`;
    this.cityPoints = `${this.cx + this.x1}, ${this.cy + this.y1}
                       ${this.cx + this.x2}, ${this.cy + this.y2}
                       ${this.cx + this.x3}, ${this.cy + this.y3}
                       ${this.cx + this.x4}, ${this.cy + this.y4}
                       ${this.cx + this.x5}, ${this.cy + this.y5}
                       ${this.cx + this.x6}, ${this.cy + this.y6}
                       ${this.cx + this.x7}, ${this.cy + this.y7}`;
  }

  placeSE(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center + (Math.sqrt(3) / 2) * Hex.side;
    this.cy = ref_hex_comp.y_center + Hex.side / 2;
    this.settlementPoints = `${this.cx + this.settle_x1}, ${this.cy + this.settle_y1}
                             ${this.cx + this.settle_x2}, ${this.cy + this.settle_y2}
                             ${this.cx + this.settle_x3}, ${this.cy + this.settle_y3}
                             ${this.cx + this.settle_x4}, ${this.cy + this.settle_y4}
                             ${this.cx + this.settle_x5}, ${this.cy + this.settle_y5}`;
    this.cityPoints = `${this.cx + this.x1}, ${this.cy + this.y1}
                       ${this.cx + this.x2}, ${this.cy + this.y2}
                       ${this.cx + this.x3}, ${this.cy + this.y3}
                       ${this.cx + this.x4}, ${this.cy + this.y4}
                       ${this.cx + this.x5}, ${this.cy + this.y5}
                       ${this.cx + this.x6}, ${this.cy + this.y6}
                       ${this.cx + this.x7}, ${this.cy + this.y7}`;
  }

  placeS(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center;
    this.cy = ref_hex_comp.y_center + Hex.side;
    this.settlementPoints = `${this.cx + this.settle_x1}, ${this.cy + this.settle_y1}
                             ${this.cx + this.settle_x2}, ${this.cy + this.settle_y2}
                             ${this.cx + this.settle_x3}, ${this.cy + this.settle_y3}
                             ${this.cx + this.settle_x4}, ${this.cy + this.settle_y4}
                             ${this.cx + this.settle_x5}, ${this.cy + this.settle_y5}`;
    this.cityPoints = `${this.cx + this.x1}, ${this.cy + this.y1}
                       ${this.cx + this.x2}, ${this.cy + this.y2}
                       ${this.cx + this.x3}, ${this.cy + this.y3}
                       ${this.cx + this.x4}, ${this.cy + this.y4}
                       ${this.cx + this.x5}, ${this.cy + this.y5}
                       ${this.cx + this.x6}, ${this.cy + this.y6}
                       ${this.cx + this.x7}, ${this.cy + this.y7}`;
  }

  placeSW(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center - (Math.sqrt(3) / 2) * Hex.side;
    this.cy = ref_hex_comp.y_center + Hex.side / 2;
    this.settlementPoints = `${this.cx + this.settle_x1}, ${this.cy + this.settle_y1}
                             ${this.cx + this.settle_x2}, ${this.cy + this.settle_y2}
                             ${this.cx + this.settle_x3}, ${this.cy + this.settle_y3}
                             ${this.cx + this.settle_x4}, ${this.cy + this.settle_y4}
                             ${this.cx + this.settle_x5}, ${this.cy + this.settle_y5}`;
    this.cityPoints = `${this.cx + this.x1}, ${this.cy + this.y1}
                       ${this.cx + this.x2}, ${this.cy + this.y2}
                       ${this.cx + this.x3}, ${this.cy + this.y3}
                       ${this.cx + this.x4}, ${this.cy + this.y4}
                       ${this.cx + this.x5}, ${this.cy + this.y5}
                       ${this.cx + this.x6}, ${this.cy + this.y6}
                       ${this.cx + this.x7}, ${this.cy + this.y7}`;
  }

  placeNW(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center - (Math.sqrt(3) / 2) * Hex.side;
    this.cy = ref_hex_comp.y_center - Hex.side / 2;
    this.settlementPoints = `${this.cx + this.settle_x1}, ${this.cy + this.settle_y1}
                             ${this.cx + this.settle_x2}, ${this.cy + this.settle_y2}
                             ${this.cx + this.settle_x3}, ${this.cy + this.settle_y3}
                             ${this.cx + this.settle_x4}, ${this.cy + this.settle_y4}
                             ${this.cx + this.settle_x5}, ${this.cy + this.settle_y5}`;
    this.cityPoints = `${this.cx + this.x1}, ${this.cy + this.y1}
                       ${this.cx + this.x2}, ${this.cy + this.y2}
                       ${this.cx + this.x3}, ${this.cy + this.y3}
                       ${this.cx + this.x4}, ${this.cy + this.y4}
                       ${this.cx + this.x5}, ${this.cy + this.y5}
                       ${this.cx + this.x6}, ${this.cy + this.y6}
                       ${this.cx + this.x7}, ${this.cy + this.y7}`;
  }
}
