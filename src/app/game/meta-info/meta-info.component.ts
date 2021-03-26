import {Component, Input, OnInit} from '@angular/core';
import {Meta} from '../../../model/Player';

@Component({
  selector: 'app-meta-info',
  templateUrl: './meta-info.component.html',
  styleUrls: ['./meta-info.component.css']
})
export class MetaInfoComponent implements OnInit {

  @Input()
  info;

  detail: boolean;

  constructor() { }

  ngOnInit(): void {}
}
