import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../game/game.component';

@Component({
  selector: 'app-half-resources-dialog',
  templateUrl: './half-resources-dialog.component.html',
  styleUrls: ['./half-resources-dialog.component.css']
})
export class HalfResourcesDialogComponent {

  constructor(public dialogRef: MatDialogRef<HalfResourcesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  less(res: number): void {
    switch (res){
      case 0: {
        if (this.data.brick > 0){
          this.data.brick -= 1;
        }
        break;
      }
      case 1: {
        if (this.data.lumber > 0){
          this.data.lumber -= 1;
        }
        break;
      }
      case 2: {
        if (this.data.wool > 0){
          this.data.wool -= 1;
        }
        break;
      }
      case 3: {
        if (this.data.grain > 0) {
          this.data.grain -= 1;
        }
        break;
      }
      case 4: {
        if (this.data.ore > 0){
          this.data.ore -= 1;
        }
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
