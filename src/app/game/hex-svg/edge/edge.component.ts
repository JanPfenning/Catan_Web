import {Component, Input, OnInit} from '@angular/core';
import {Edge} from '../../../../model/Edge';
import {edgeToAdjHexes, edgeToFacing} from '../../../translator';
import {GameService} from '../../game.service';
import {Hex} from '../../../../model/Hex';
import {Structure} from '../../../../model/Structure';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-edge]',
  templateUrl: './edge.component.svg',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent implements OnInit {

  @Input()
  edge: Edge;

  gameService: GameService;

  fillColor = '#ff00ff';
  facing: 'vertical' | 'negative' | 'positive';
  cx = 0;
  cy = 0;
  hex_cx = 0;
  hex_cy = 0;

  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  strokeWidth = 2;
  x3 = (-27.5 / 100) * Hex.side;
  y3 = (5 / 100) * Hex.side;
  x4 = (-2.5 / 100) * Hex.side;
  y4 = (5 / 100) * Hex.side;
  x5 = (-2.5 / 100) * Hex.side;
  y5 = (-25 / 100) * Hex.side;
  x6 = (17.5 / 100) * Hex.side;
  y6 = (-15 / 100) * Hex.side;
  x7 = (2.5 / 100) * Hex.side;
  y7 = (0 / 100) * Hex.side;
  x8 = (2.5 / 100) * Hex.side;
  y8 = (5 / 100) * Hex.side;
  x9 = (27.5 / 100) * Hex.side;
  y9 = (5 / 100) * Hex.side;
  x10 = (17.5 / 100) * Hex.side;
  y10 = (25 / 100) * Hex.side;
  x11 = (-17.5 / 100) * Hex.side;
  y11 = (25 / 100) * Hex.side;
  ship_points;

  street = false;
  ship = false;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {
    this.facing = edgeToFacing(this.edge);
    if (+this.edge.building === +Structure.Ship){
      this.ship = true;
    }
    if (+this.edge.building === +Structure.Road){
      this.street = true;
    }
    const adj_hexes = edgeToAdjHexes(this.edge);
    let leftHex;
    try {
      leftHex = this.gameService.hex_comps[adj_hexes[0][0]][adj_hexes[0][1]];
    } catch (e) {
      leftHex = null;
    }
    let rightHex;
    try {
      rightHex = this.gameService.hex_comps[adj_hexes[1][0]][adj_hexes[1][1]];
    } catch (e) {
      rightHex = null;
    }
    // TODO why can this be undefined?
    if (leftHex !== null && leftHex !== undefined) {
      this.hex_cx = leftHex.x_center;
      this.hex_cy = leftHex.y_center;
      switch (this.facing) {
        case 'negative':
          this.x1 = this.hex_cx + Math.sqrt(3) / 2 * Hex.side;
          this.y1 = this.hex_cy - Hex.side / 2;
          this.x2 = this.hex_cx;
          this.y2 = this.hex_cy - Hex.side;

          this.cx = Math.min(this.x1, this.x2) + Math.abs(this.x1 - this.x2) / 2;
          this.cy = Math.min(this.y1, this.y2) + Math.abs(this.y1 - this.y2) / 2;

          this.ship_points = `${this.cx + this.x3}, ${this.cy + this.y3}
                              ${this.cx + this.x4}, ${this.cy + this.y4}
                              ${this.cx + this.x5}, ${this.cy + this.y5}
                              ${this.cx + this.x6}, ${this.cy + this.y6}
                              ${this.cx + this.x7}, ${this.cy + this.y7}
                              ${this.cx + this.x8}, ${this.cy + this.y8}
                              ${this.cx + this.x9}, ${this.cy + this.y9}
                              ${this.cx + this.x10}, ${this.cy + this.y10}
                              ${this.cx + this.x11}, ${this.cy + this.y11}`;
          break;
        case 'positive':
          this.x1 = leftHex.x_center + Math.sqrt(3) / 2 * Hex.side;
          this.y1 = leftHex.y_center + Hex.side / 2;
          this.x2 = leftHex.x_center;
          this.y2 = leftHex.y_center + Hex.side;

          this.cx = Math.min(this.x1, this.x2) + Math.abs(this.x1 - this.x2) / 2;
          this.cy = Math.min(this.y1, this.y2) + Math.abs(this.y1 - this.y2) / 2;

          this.ship_points = `${this.x3 + this.cx}, ${this.y3 + this.cy}
                              ${this.x4 + this.cx}, ${this.y4 + this.cy}
                              ${this.x5 + this.cx}, ${this.y5 + this.cy}
                              ${this.x6 + this.cx}, ${this.y6 + this.cy}
                              ${this.x7 + this.cx}, ${this.y7 + this.cy}
                              ${this.x8 + this.cx}, ${this.y8 + this.cy}
                              ${this.x9 + this.cx}, ${this.y9 + this.cy}
                              ${this.x10 + this.cx}, ${this.y10 + this.cy}
                              ${this.x11 + this.cx}, ${this.y11 + this.cy}`;
          break;
        case 'vertical':
          this.x1 = leftHex.x_center + Math.sqrt(3) / 2 * Hex.side;
          this.y1 = leftHex.y_center + Hex.side / 2;
          this.x2 = leftHex.x_center + Math.sqrt(3) / 2 * Hex.side;
          this.y2 = leftHex.y_center - Hex.side / 2;

          this.cx = Math.min(this.x1, this.x2) + Math.abs(this.x1 - this.x2) / 2;
          this.cy = Math.min(this.y1, this.y2) + Math.abs(this.y1 - this.y2) / 2;

          this.ship_points = `${this.x3 + this.cx}, ${this.y3 + this.cy}
                              ${this.x4 + this.cx}, ${this.y4 + this.cy}
                              ${this.x5 + this.cx}, ${this.y5 + this.cy}
                              ${this.x6 + this.cx}, ${this.y6 + this.cy}
                              ${this.x7 + this.cx}, ${this.y7 + this.cy}
                              ${this.x8 + this.cx}, ${this.y8 + this.cy}
                              ${this.x9 + this.cx}, ${this.y9 + this.cy}
                              ${this.x10 + this.cx}, ${this.y10 + this.cy}
                              ${this.x11 + this.cx}, ${this.y11 + this.cy}`;
          break;
      }
      // TODO why can this be undefined?
    } else if (rightHex !== null && rightHex !== undefined) {
      this.cx = rightHex.x_center;
      this.cy = rightHex.y_center;
      switch (this.facing) {
        case 'negative':
          this.x1 = rightHex.x_center - Math.sqrt(3) / 2 * Hex.side;
          this.y1 = rightHex.y_center + Hex.side / 2;
          this.x2 = rightHex.x_center;
          this.y2 = rightHex.y_center + Hex.side;
          break;
        case 'positive':
          this.x1 = rightHex.x_center - Math.sqrt(3) / 2 * Hex.side;
          this.y1 = rightHex.y_center - Hex.side / 2;
          this.x2 = rightHex.x_center;
          this.y2 = rightHex.y_center - Hex.side;
          break;
        case 'vertical':
          this.x1 = rightHex.x_center - Math.sqrt(3) / 2 * Hex.side;
          this.y1 = rightHex.y_center + Hex.side / 2;
          this.x2 = rightHex.x_center - Math.sqrt(3) / 2 * Hex.side;
          this.y2 = rightHex.y_center - Hex.side / 2;
          break;
      }
    } else {
      // console.log(`No adjacent Hex is valid (${this.edge.x}, ${this.edge.y})`);
      // console.log(this.edge);
      // console.log(adj_hexes);
    }
    this.gameService.edge_comps[this.edge.x][this.edge.y] = this;
    this.gameService.gameObject.players.forEach(player => {
      // console.log(player);
      if (player.PID === this.edge.owner_id){
        this.fillColor = player.colour;
        this.strokeWidth = 1.5;
      }
    });
  }
}
