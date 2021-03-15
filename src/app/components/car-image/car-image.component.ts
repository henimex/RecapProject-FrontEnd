import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  images: CarImage[];
  carImages: CarImage[];
  dataLoaded = false;
  defaultImgPath:string;

  constructor(
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getImagesByCarId(params['carId']);
      } else {
        console.log('New Method Should be Iplemented');
        this.getImages();
      }
    });
  }

  getImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

  getImagesByCarId(carId: number) {
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
      if (this.carImages[0].carId==0) {
        this.defaultImgPath=this.carImages[0].imagePath;
        console.log("Yesss")
      }
    });
  }
}
