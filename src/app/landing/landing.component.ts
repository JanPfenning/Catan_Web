import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LobbyService} from '../lobby/lobby.service';
import {CatanMap} from '../../model/CatanMap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  router: Router;
  gameId = 0;
  passcode = '';
  lobbyService: LobbyService;
  map: CatanMap;

  constructor(router: Router,
              lobbyService: LobbyService) {
    this.router = router;
    this.lobbyService = lobbyService;
  }

  // TODO move to game comp
  // TODO replace canvas with SVG
  ngOnInit(): void {
    this.map = new CatanMap(10, 10);
    const canvasElement = document.getElementById('hexgrid');
    // @ts-ignore
    const ctx = canvasElement.getContext('2d');
    ctx.font = '10px Arial';
    for (const line of this.map.getHexes()) {
      for (const hex of line){
        this.drawHex(hex, ctx);
      }
    }
  }

  // TODO move to game comp
  drawHex(hex: any, ctx: any): void{
    const canv_padding = 20;
    // Pushing even rows half a hex to right
    const Xcenter = hex.y % 2 === 0 ? hex.x * hex.width + canv_padding + hex.inCircRad : hex.x * hex.width + canv_padding;
    const Ycenter = hex.y * (hex.width - hex.side / 4) + canv_padding;
    const size = hex.side;
    ctx.fillText(`(${hex.x}, ${hex.y})`, Xcenter - hex.side / 2, Ycenter);
    ctx.beginPath();
    ctx.moveTo(Xcenter +  size * Math.cos(Math.PI / 180 * -30), Ycenter +  size *  Math.sin(Math.PI / 180 *  -30));
    for (let i = 1; i <= 6; i ++) {
      ctx.lineTo (
        Xcenter + size * Math.cos(Math.PI / 180 * (60 * i - 30)),
        Ycenter + size * Math.sin(Math.PI / 180 * (60 * i - 30))
      );
    }
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  create(): void{
    this.router.navigate(['create/rules']);
  }

  changeId(event: any): void{
    this.gameId = event.target.value;
  }
  changePass(event: any): void {
    this.passcode = event.target.value;
  }
  join(): void{
    this.lobbyService.getLobbyPass(this.gameId).subscribe(value => {
      if (value === this.passcode){
        this.lobbyService.id = this.gameId;
        this.router.navigate(['join']);
      }
      else{
        // TODO
        console.log('wrong passcode');
      }
    });
  }
  spectate(): void{
    // TODO
  }
}
