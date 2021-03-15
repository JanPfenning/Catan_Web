import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Resource} from '../../../../model/Resource';

@Component({
  selector: 'app-monopoly-dialog',
  templateUrl: './monopoly-dialog.component.html',
  styleUrls: ['./monopoly-dialog.component.css']
})
export class MonopolyDialogComponent {

  constructor(public dialogRef: MatDialogRef<MonopolyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MonopolyData) {}

}

export interface MonopolyData {
  res: Resource;
}
