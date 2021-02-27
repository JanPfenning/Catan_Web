import {Component, Input, OnInit} from '@angular/core';
import {Playerentity} from '../../../model/Player';

@Component({
  selector: 'app-own-cards',
  templateUrl: './own-cards.component.html',
  styleUrls: ['./own-cards.component.css']
})
export class OwnCardsComponent implements OnInit {

  @Input()
  player: Playerentity;

  constructor() { }

  ngOnInit(): void {}

}
