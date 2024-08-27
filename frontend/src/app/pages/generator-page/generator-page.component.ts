import { Component } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';

@Component({
  selector: 'app-generator-page',
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.css'],
})
export class GeneratorPageComponent {
  constructor(public readonly gridService: GridService) {}

  handleOnClickGenerate() {
    this.gridService.start();
  }

  handleOnChangeInput(value: string) {
    this.gridService.setBias(value);
  }
}
