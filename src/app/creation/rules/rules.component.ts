import { Component, OnInit } from '@angular/core';
import {CreationService} from '../creation.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  bankResourceAmount: number;
  knightCardAmount: number;
  monopolyCardAmount: number;
  roadbuildingCardAmount: number;
  victorypointCardAmount: number;
  yearOfPlentyCardAmount: number;
  necessaryVictoryPoints: number;
  creationService: CreationService;
  router: Router;
  route: ActivatedRoute;

  constructor(creationService: CreationService,
              router: Router,
              route: ActivatedRoute) {
    this.creationService = creationService;
    this.router = router;
    this.route = route;

    this.bankResourceAmount = this.creationService.rules.bank_res;
    this.knightCardAmount = this.creationService.rules.dev_cards.knight;
    this.monopolyCardAmount = this.creationService.rules.dev_cards.monopoly;
    this.roadbuildingCardAmount = this.creationService.rules.dev_cards.road;
    this.victorypointCardAmount = this.creationService.rules.dev_cards.vicotrypoint;
    this.yearOfPlentyCardAmount = this.creationService.rules.dev_cards.yop;
    this.necessaryVictoryPoints = this.creationService.rules.p2w;
  }

  ngOnInit(): void {
  }

  changeBankResourceAmount(e: any): void{
    this.bankResourceAmount = e.target.value;
  }

  changeDevelopmentcards(e: any, card: string): void {
    switch (card){
      case 'Knight':
        this.knightCardAmount = e.target.value;
        break;
      case 'Roadbuilding':
        this.roadbuildingCardAmount = e.target.value;
        break;
      case 'Monopoly':
        this.monopolyCardAmount = e.target.value;
        break;
      case 'Victorypoint':
        this.victorypointCardAmount = e.target.value;
        break;
      case 'YearOfPlenty':
        this.yearOfPlentyCardAmount = e.target.value;
        break;
      default:
        break;
    }
  }

  changeVictorypoints(e: any): void {
    this.necessaryVictoryPoints = e.target.value;
  }

  continue(): void{
    this.sendToSerivce();
    this.router.navigate(['settings'], {relativeTo: this.route.parent});
  }

  back(): void{
    this.sendToSerivce();
    this.router.navigate(['']);
  }

  sendToSerivce(): void {
    this.creationService.rules.p2w = this.necessaryVictoryPoints;
    this.creationService.rules.bank_res = this.bankResourceAmount;
    this.creationService.rules.dev_cards =
      {
        knight: this.knightCardAmount,
        vicotrypoint: this.victorypointCardAmount,
        monopoly: this.monopolyCardAmount,
        road: this.roadbuildingCardAmount,
        yop: this.yearOfPlentyCardAmount,
      };
  }

}
