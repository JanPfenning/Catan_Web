import { Component, OnInit } from '@angular/core';
import {CreationService} from '../creation.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  creationService: CreationService;
  router: Router;
  route: ActivatedRoute;

  constructor(creationService: CreationService,
              router: Router,
              route: ActivatedRoute) {
    this.creationService = creationService;
    this.router = router;
    this.route = route;
  }

  ngOnInit(): void {
  }

  continue(): void{
    this.router.navigate(['settings'], {relativeTo: this.route.parent});
  }

  back(): void{
    this.router.navigate(['']);
  }

  updateMaxRes($event: any): void {
    this.creationService.max_res = $event.target.value;
  }

  updateKnights($event: any): void  {
    this.creationService.max_dev.knight = $event.target.value;

  }

  updateMonopoly($event: any): void  {
    this.creationService.max_dev.monopoly = $event.target.value;
  }

  updateRoadbuilding($event: any): void  {
    this.creationService.max_dev.roadbuilding = $event.target.value;
  }

  updateVictorypoint($event: any): void  {
    this.creationService.max_dev.victorypoint = $event.target.value;
  }

  updateYop($event: any): void  {
    this.creationService.max_dev.yop = $event.target.value;
  }

  updatePointsToWin($event: any): void  {
    this.creationService.pointsToWin = $event.target.value;
  }
}
