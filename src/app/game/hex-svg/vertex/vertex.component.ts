import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-vertex]',
  templateUrl: './vertex.component.svg',
  styleUrls: ['./vertex.component.css']
})
export class VertexComponent implements OnInit {

  @Input()
  vertex;

  constructor() { }

  ngOnInit(): void {
  }

}
