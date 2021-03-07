import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../game/game.component';


@Component({
  selector: 'app-trade-request-dialog',
  templateUrl: './trade-request-dialog.component.html',
  styleUrls: ['./trade-request-dialog.component.css']
})
export class TradeRequestDialogComponent {

  constructor(public dialogRef: MatDialogRef<TradeRequestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  less(res: number): void {
    switch (res){
      case 0: {
        this.data.brick -= 1;
        break;
      }
      case 1: {
        this.data.lumber -= 1;
        break;
      }
      case 2: {
        this.data.wool -= 1;
        break;
      }
      case 3: {
        this.data.grain -= 1;
        break;
      }
      case 4: {
        this.data.ore -= 1;
        break;
      }
    }
  }

  more(res: number): void {
    switch (res){
      case 0: {
        this.data.brick += 1;
        break;
      }
      case 1: {
        this.data.lumber += 1;
        break;
      }
      case 2: {
        this.data.wool += 1;
        break;
      }
      case 3: {
        this.data.grain += 1;
        break;
      }
      case 4: {
        this.data.ore += 1;
        break;
      }
    }
  }
}
