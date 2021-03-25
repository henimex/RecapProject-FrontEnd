import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  dataLoaded = false;
  currentColor: Color;
  filterText: string;
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColors();
  }

  clearFilter() {
    this.currentColor = { id: 0, colorName: '' };
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  deleteColor(color: Color) {
    this.colorService.deleteColor(color).subscribe((response) => {
      this.toastrService.info(color.colorName + ' Successfully deleted','Delete Operation');
    });
  }
}
