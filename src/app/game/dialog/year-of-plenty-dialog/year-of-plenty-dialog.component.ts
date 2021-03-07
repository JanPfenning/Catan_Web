import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Resource} from '../../../../model/Resource';

@Component({
  selector: 'app-year-of-plenty-dialog',
  templateUrl: './year-of-plenty-dialog.component.html',
  styleUrls: ['./year-of-plenty-dialog.component.css']
})
export class YearOfPlentyDialogComponent{

  constructor(public dialogRef: MatDialogRef<YearOfPlentyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: YopData) {}

}

export interface YopData {
  one: Resource;
  two: Resource;
}
