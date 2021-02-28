import {Component, Input, OnInit} from '@angular/core';
import {Edge} from '../../../../model/Edge';
import {edgeToAdjHexes, edgeToFacing} from '../../../translator';
import {GameService} from '../../game.service';
import {tryCatch} from 'rxjs/internal-compatibility';
import {Hex} from '../../../../model/Hex';

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
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  strokeWidth = 2;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {
    this.facing = edgeToFacing(this.edge);
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
      switch (this.facing) {
        case 'negative':
          this.x1 = leftHex.x_center + Math.sqrt(3) / 2 * Hex.side;
          this.y1 = leftHex.y_center - Hex.side / 2;
          this.x2 = leftHex.x_center;
          this.y2 = leftHex.y_center - Hex.side;
          break;
        case 'positive':
          this.x1 = leftHex.x_center + Math.sqrt(3) / 2 * Hex.side;
          this.y1 = leftHex.y_center + Hex.side / 2;
          this.x2 = leftHex.x_center;
          this.y2 = leftHex.y_center + Hex.side;
          break;
        case 'vertical':
          this.x1 = leftHex.x_center + Math.sqrt(3) / 2 * Hex.side;
          this.y1 = leftHex.y_center + Hex.side / 2;
          this.x2 = leftHex.x_center + Math.sqrt(3) / 2 * Hex.side;
          this.y2 = leftHex.y_center - Hex.side / 2;
          break;
      }
      // TODO why can this be undefined?
    } else if (rightHex !== null && rightHex !== undefined) {
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
      // console.log('that should not happen. No adjacent Hex is valid');
      // console.log(this.edge);
      // console.log(adj_hexes);
    }
    this.gameService.edge_comps[this.edge.x][this.edge.y] = this;
    // console.log(this);
  }
}
