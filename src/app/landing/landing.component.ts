import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LobbyService} from '../lobby/lobby.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  router: Router;
  gameId: number = 0;
  passcode: any = '';
  lobbyService: LobbyService;

  constructor(router: Router,
  lobbyService: LobbyService) {
    this.router = router;
    this.lobbyService = lobbyService;
  }

  ngOnInit(): void {
  }

  create(): void{
    this.router.navigate(['create/rules']);
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

  changeId(event: any): void{
    this.gameId = event.target.value;
  }

  spectate(): void{
    // TODO
  }

  changePass(event: any) {
    this.passcode = event.target.value;
  }
}
