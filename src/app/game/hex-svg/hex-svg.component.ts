import {Component, Input, OnInit} from '@angular/core';
import {Hex} from '../../../model/Hex';
import {Harbour} from '../../../model/Harbour';
import {Vertex} from '../../../model/Vertex';

@Component({
  selector: 'app-hex-svg[hex]',
  templateUrl: './hex-svg.component.svg',
  styleUrls: ['./hex-svg.component.css']
})
export class HexSvgComponent implements OnInit{

  @Input()
  hex: Hex[][];
  @Input()
  onHexClickFun;
  @Input()
  harbours: Harbour[];
  @Input()
  vertices: Vertex[][];
  @Input()
  edges;
  width: number;

  ngOnInit(): void {
    this.width = Hex.side;
  }
}
