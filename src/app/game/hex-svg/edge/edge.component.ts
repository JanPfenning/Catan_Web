import {Component, Input, OnInit} from '@angular/core';
import {Edge} from '../../../../model/Edge';

@Component({
  selector: 'app-edge',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent implements OnInit {

  @Input()
  edge: Edge;

  constructor() { }

  ngOnInit(): void {
  }

}
