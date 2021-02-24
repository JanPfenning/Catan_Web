import { Component, OnInit } from '@angular/core';
import {LobbyService} from '../lobby.service';
import {Router} from '@angular/router';
import {GameService} from '../../game/game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  lobbyService: LobbyService;
  gameService: GameService;
  showPass = false;
  router: Router;
  lobbyPass = 'Not determined yet.';

  constructor(lobbyService: LobbyService, router: Router, gameService: GameService) {
    this.router = router;
    this.lobbyService = lobbyService;
    this.lobbyService.getLobbyPass().subscribe(val => this.lobbyPass = val);
    this.lobbyService.connectMqtt();
    this.lobbyService.me = {id: '', name: '', color: '#fff'};
    this.gameService = gameService;
  }

  ngOnInit(): void {
  }

  onChangeColor(event: any): void{
    this.lobbyService.me.color = event.target.value;
    this.lobbyService.onChange().subscribe();
  }

  onChangeName(event: any): void{
    this.lobbyService.me.name = event.target.value;
    this.lobbyService.onChange().subscribe();
  }

  startGame(): void{
    this.lobbyService.start().subscribe(ret => {
      if (ret === true){
        this.gameService.GID = this.lobbyService.id;
        this.gameService.connectMqtt();
        this.router.navigate(['game']);
      }
    });
  }
}
