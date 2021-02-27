import {Component, Input, OnInit} from '@angular/core';
import {getHighContrast} from '../../translator';

@Component({
  selector: 'app-meta-info',
  templateUrl: './meta-info.component.html',
  styleUrls: ['./meta-info.component.css']
})
export class MetaInfoComponent implements OnInit {

  @Input()
  info;

  getHighContrast = getHighContrast;

  constructor() { }

  ngOnInit(): void {}
}