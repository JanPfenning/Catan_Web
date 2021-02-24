import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LobbyService} from '../lobby/lobby.service';
import {CatanMap} from '../../model/CatanMap';
import {GameService} from '../game/game.service';

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
  gameService: GameService;

  constructor(router: Router,
              lobbyService: LobbyService,
              gameService: GameService) {
    this.router = router;
    this.lobbyService = lobbyService;
    this.gameService = gameService;
  }

  // TODO move to game comp
  ngOnInit(): void {
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
