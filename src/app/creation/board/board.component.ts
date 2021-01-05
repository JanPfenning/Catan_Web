import { Component, OnInit } from '@angular/core';
import {CreationService} from '../creation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LobbyService} from '../../lobby/lobby.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  randomBoard = false;
  boardHeight: number;
  boardWidth: number;
  balancedFields = true;
  brickFields: number;
  lumberFields: number;
  woolFields: number;
  grainFields: number;
  oreFields: number;
  goldFields: number;
  waterFields: number;
  creationService: CreationService;
  private lobbyService: LobbyService;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    creationService: CreationService,
    lobbyService: LobbyService
  ) {
    this.lobbyService = lobbyService;
    this.creationService = creationService;
    this.boardHeight = this.creationService.rules.board_height;
    this.boardWidth = this.creationService.rules.board_width;
    this.brickFields = this.creationService.rules.res_fields.brick;
    this.lumberFields = this.creationService.rules.res_fields.lumber;
    this.woolFields = this.creationService.rules.res_fields.wool;
    this.grainFields = this.creationService.rules.res_fields.grain;
    this.oreFields = this.creationService.rules.res_fields.ore;
    this.goldFields = this.creationService.rules.res_fields.gold;
    this.calculateWater();
  }

  ngOnInit(): void {

  }

  randomBoardToggle(): void {
    this.randomBoard = !this.randomBoard;
  }

  // TODO handle negative water
  calculateWater(): void{
    this.waterFields = this.boardHeight * this.boardWidth
      - this.brickFields - this.lumberFields - this.woolFields - this.grainFields - this.oreFields - this.goldFields;
  }

  changeHeight(e: any): void {
    this.boardHeight = e.target.value;
    this.calculateWater();
  }

  changeWidth(e: any): void {
    this.boardWidth = e.target.value;
    this.calculateWater();
  }

  balanceFields(): void {
    this.balancedFields = !this.balancedFields;
    if (this.balancedFields){
      this.lumberFields = this.brickFields;
      this.woolFields = this.brickFields;
      this.grainFields = this.brickFields;
      this.oreFields = this.brickFields;
    }
    this.calculateWater();
  }

  changeBrickfields(e: any): void {
    this.brickFields = e.target.value;
    this.calculateWater();
  }
  changeLumberfields(e: any): void {
    this.lumberFields = e.target.value;
    this.calculateWater();
  }
  changeWoolfields(e: any): void {
    this.woolFields = e.target.value;
    this.calculateWater();
  }
  changeGrainfields(e: any): void {
    this.grainFields = e.target.value;
    this.calculateWater();
  }
  changeOrefields(e: any): void {
    this.oreFields = e.target.value;
    this.calculateWater();
  }
  changeGoldfields(e: any): void {
    this.goldFields = e.target.value;
    this.calculateWater();
  }

  changeResourceFields(e: any): void{
    this.brickFields = e.target.value;
    this.lumberFields = e.target.value;
    this.woolFields = e.target.value;
    this.grainFields = e.target.value;
    this.oreFields = e.target.value;
    this.calculateWater();
  }
  // TODO Harbours

  sendToService(): void{
    this.creationService.rules.res_fields = {
      brick: this.brickFields,
      lumber: this.lumberFields,
      wool: this.woolFields,
      grain: this.grainFields,
      ore: this.oreFields,
      gold: this.goldFields
    };
  }

  back(): void{
    this.sendToService();
    this.router.navigate(['rules'], {relativeTo: this.route.parent});
  }

  publishGame(): void {
    this.sendToService();
    this.creationService.createGame().subscribe(val => {
      this.lobbyService.id = val;
      this.router.navigate(['join'], {state: {id: val.toString()}});
    });
  }
}
