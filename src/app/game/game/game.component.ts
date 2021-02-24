import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';
import {HexComponent} from '../hex-svg/hex/hex.component';
import {HexSvgComponent} from '../hex-svg/hex-svg.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {
  }

}
