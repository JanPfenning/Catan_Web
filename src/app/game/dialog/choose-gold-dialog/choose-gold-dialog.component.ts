import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../game/game.component';
import {GameService} from '../../game.service';

@Component({
  selector: 'app-choose-gold-dialog',
  templateUrl: './choose-gold-dialog.component.html',
  styleUrls: ['./choose-gold-dialog.component.css']
})
export class ChooseGoldDialogComponent {

  wishes: number;

  constructor(private gameService: GameService,
              public dialogRef: MatDialogRef<ChooseGoldDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.leftToWish();
  }

  less(res: number): void {
    switch (res){
      case 0: {
        if (this.data.brick > 0){
          this.data.brick -= 1;
        }
        break;
      }
      case 1: {
        if (this.data.lumber > 0) {
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
        if (this.data.ore > 0) {
          this.data.ore -= 1;
        }
        break;
      }
    }
    this.leftToWish();
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
    this.leftToWish();
  }

  private leftToWish(): void {
    this.wishes = this.gameService.gameObject.goldReceive.filter(value => value === this.gameService.playerObject.meta.PID).length;
    this.wishes -= this.data.brick;
    this.wishes -= this.data.lumber;
    this.wishes -= this.data.wool;
    this.wishes -= this.data.grain;
    this.wishes -= this.data.ore;
  }
}
