import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailsDto } from 'src/app/models/Dto/carDetailDto';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetailsDto[] = [];
  carImages: CarImage[] = [];

  dataLoaded = false;
  constructor(
    private carService: CarService,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.getCars();
    this.getCarDetails();
    this.getImagesById(1)
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      console.log('getCars Response Success: ' + response.success);
      this.dataLoaded = true;
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      console.log('getCarDetails Response Success: ' + response.success);
    });
  }

  getImagesById(carId: number) {
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      console.log(response.data)
    });
  }
}
