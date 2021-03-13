import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  images: CarImage[] = [];
  carImages: CarImage[] = [];
  dataLoaded = false;
  constructor(private carImageService: CarImageService) {}

  ngOnInit(): void {
    this.getImages();
  }
  getImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }

  getImagesById(carId: number) {
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
}
