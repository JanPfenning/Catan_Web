import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HexSvgComponent} from '../game/hex-svg/hex-svg.component';
import {HexComponent} from '../game/hex-svg/hex/hex.component';
import {VertexComponent} from '../game/hex-svg/vertex/vertex.component';
import {EdgeComponent} from '../game/hex-svg/edge/edge.component';
import {BarChartComponent} from '../bar-chart/bar-chart.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TradeRequestDialogComponent} from '../game/dialog/trade-request-dialog/trade-request-dialog.component';
import {YearOfPlentyDialogComponent} from '../game/dialog/year-of-plenty-dialog/year-of-plenty-dialog.component';

@NgModule({
  declarations: [HexSvgComponent, HexComponent, VertexComponent, EdgeComponent, BarChartComponent],
  imports: [
    MatInputModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
  ],
  exports: [HexSvgComponent, HexComponent, VertexComponent, EdgeComponent, BarChartComponent]
})
export class SharedModule { }
