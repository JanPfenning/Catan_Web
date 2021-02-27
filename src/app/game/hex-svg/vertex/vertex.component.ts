import {Component, Input, OnInit} from '@angular/core';
import {Hex} from '../../../../model/Hex';
import {vertexToAdjHexes} from '../../../translator';
import {GameService} from '../../game.service';
import {HexComponent} from '../hex/hex.component';
import {executionAsyncResource} from 'async_hooks';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-vertex]',
  templateUrl: './vertex.component.svg',
  styleUrls: ['./vertex.component.css']
})
export class VertexComponent implements OnInit {

  @Input()
  vertex;

  cy = 0;
  cx = 0;
  gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {
    const adj_hexes = vertexToAdjHexes(this.vertex);
    console.log(this.gameService.hex_comps);
    console.log(adj_hexes);
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
    }else{
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
          this.placeSW(west_hex);
        }else if (east_hex) {
          this.placeSE(east_hex);
        }
      }
    }
  }

  placeN(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center;
    this.cy = ref_hex_comp.y_center - Hex.side;
  }

  placeNE(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center + (Math.sqrt(3) / 2) * Hex.side;
    this.cy = ref_hex_comp.y_center - Hex.side / 2;
  }

  placeSE(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center + (Math.sqrt(3) / 2) * Hex.side;
    this.cy = ref_hex_comp.y_center + Hex.side / 2;
  }

  placeS(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center;
    this.cy = ref_hex_comp.y_center + Hex.side;
  }

  placeSW(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center - (Math.sqrt(3) / 2) * Hex.side;
    this.cy = ref_hex_comp.y_center + Hex.side / 2;
  }

  placeNW(ref_hex_comp: HexComponent): void{
    this.cx = ref_hex_comp.x_center - (Math.sqrt(3) / 2) * Hex.side;
    this.cy = ref_hex_comp.y_center - Hex.side / 2;
  }
}
