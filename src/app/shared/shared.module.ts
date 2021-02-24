import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HexSvgComponent} from '../game/hex-svg/hex-svg.component';
import {HexComponent} from '../game/hex-svg/hex/hex.component';
import {VertexComponent} from '../game/hex-svg/vertex/vertex.component';
import {EdgeComponent} from '../game/hex-svg/edge/edge.component';

@NgModule({
  declarations: [HexSvgComponent, HexComponent, VertexComponent, EdgeComponent],
    imports: [
        CommonModule,
    ],
  exports: [HexSvgComponent, HexComponent, VertexComponent, EdgeComponent]
})
export class SharedModule { }
