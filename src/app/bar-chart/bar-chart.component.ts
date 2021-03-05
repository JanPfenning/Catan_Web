import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.svg',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges {

  @Input()
  data: number[];
  @Input()
  labels: string[];
  @Input()
  width: number;
  @Input()
  height: number;

  barWidth: number;
  heights: number[] = [];

  constructor() {}

  ngOnChanges(): void {
    this.barWidth = (this.width / (2 * this.labels.length + 2));
    const max = Math.max(...this.data);
    this.heights = [];
    this.data.forEach(value => {
      this.heights.push((value * this.height) / max);
    });
  }
}
