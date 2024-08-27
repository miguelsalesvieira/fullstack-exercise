import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  gridStyle: { 'grid-template-columns': string } = {
    'grid-template-columns': 'repeat(1, minmax(0, 1fr))',
  };
  @Input() grid: string[][] = [];

  constructor() {}

  ngOnChanges(): void {
    this.updateStyle();
  }

  ngOnInit(): void {
    this.updateStyle();
  }

  updateStyle(): void {
    this.gridStyle = {
      'grid-template-columns': `repeat(${
        this.grid[0]?.length || 1
      }, minmax(0, 1fr))`,
    };
  }
}
