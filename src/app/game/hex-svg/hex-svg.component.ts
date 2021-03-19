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
  @Input()
  fullscreen;
  width: number;
  height: any;

  ngOnInit(): void {
    if (document.getElementsByTagName('body')[0].clientWidth <= document.getElementsByTagName('body')[0].clientHeight){
      Hex.setSide(document.getElementsByTagName('body')[0].clientWidth / 22);
    }else{
      Hex.setSide(document.getElementsByTagName('body')[0].clientHeight / 22);
    }
    if (this.fullscreen){
      this.width = document.getElementsByTagName('body')[0].clientWidth;
      this.height = document.getElementsByTagName('body')[0].clientHeight;
    }else{
      this.height = Hex.side  * 2 * (this.hex[0].length - 1);
      this.width = Hex.side * 2 * (this.hex.length);
    }
    this.hex = JSON.parse(JSON.stringify(this.hex));
  }
}
