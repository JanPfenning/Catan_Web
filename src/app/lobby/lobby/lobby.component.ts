import { Component, OnInit } from '@angular/core';
import {LobbyService} from '../lobby.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  lobbyService: LobbyService;
  showPass = false;
  lobbyPass = 'Not determined yet.';

  constructor(lobbyService: LobbyService) {
    this.lobbyService = lobbyService;
    this.lobbyService.getLobbyPass().subscribe(val => this.lobbyPass = val);
    this.lobbyService.connectMqtt();
    this.lobbyService.me = {id: '', name: '', color: '#fff'};
  }

  ngOnInit(): void {
  }

  onChangeColor(event: any): void{
    this.lobbyService.me.color = event.target.value;
    console.log('color changed, submitting');
    this.lobbyService.onChange().subscribe();
  }

  onChangeName(event: any): void{
    this.lobbyService.me.name = event.target.value;
    console.log('name changed, submitting');
    this.lobbyService.onChange().subscribe();
  }

  startGame(): void{
    this.lobbyService.start();
  }
}
