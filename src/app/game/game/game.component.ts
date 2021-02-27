import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';
import {Hex} from '../../../model/Hex';
import {hexToAdjVertices, pointInTriangle} from '../../translator';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameService: GameService;
  onHexClick = this.getHexPosition;

  constructor(gameService: GameService) {
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
    // console.log(adj_vert);
    if (pointInTriangle(rc, center, ne, e)){
      console.log(adj_vert[1]);
    }else if (pointInTriangle(rc, center, e, se)){
      console.log(adj_vert[2]);
    }else if (pointInTriangle(rc, center, se, sw)){
      console.log(adj_vert[3]);
    }else if (pointInTriangle(rc, center, sw, w)){
      console.log(adj_vert[4]);
    }else if (pointInTriangle(rc, center, w, nw)){
      console.log(adj_vert[5]);
    }else if (pointInTriangle(rc, center, nw, ne)){
      console.log(adj_vert[0]);
    }
  }

  interact($event: MouseEvent): void{
    this.getClickedVertex($event);
  }
}
