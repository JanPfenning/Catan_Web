import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HexSvgComponent} from '../game/hex-svg/hex-svg.component';
import {HexComponent} from '../game/hex-svg/hex/hex.component';
import {VertexComponent} from '../game/hex-svg/vertex/vertex.component';
import {EdgeComponent} from '../game/hex-svg/edge/edge.component';
import {BarChartComponent} from '../bar-chart/bar-chart.component';
import {DialogDataExampleDialog} from '../game/game/game.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [HexSvgComponent, HexComponent, VertexComponent, EdgeComponent, BarChartComponent, DialogDataExampleDialog],
  imports: [
    MatInputModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
  ],
  exports: [HexSvgComponent, HexComponent, VertexComponent, EdgeComponent, BarChartComponent, DialogDataExampleDialog]
})
export class SharedModule { }
