import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  cars: Car[];
  carDetails: CarDetailsDto[];
  carImages: CarImage[];
  currentCarImages: CarImage[];
  currentCar: CarDetailsDto;
  imagePath: string;

  dataLoaded = false;
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarDetailsByBrand(params.brandId);
      } else if (params['colorId']) {
        this.getCarDetailsByColor(params.colorId);
      } else {
        this.getCarDetails();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.carClipartImage(this.carDetails)
    });
  }

  carClipartImage(carDetail:CarDetailsDto[]){
    carDetail.forEach(car => {
      this.carImageService.getCarImageByCarId(car.carId).subscribe(response => {
        car.imagePath = response.data[0].imagePath
      })
    });
    console.log("Thank you to KOD YAZARIM")
  }

  getCarDetailsByBrand(brandId: number) {
    this.carService.getCarDetailsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.carClipartImage(this.carDetails)
    });
  }

  getCarDetailsByColor(colorId: number) {
    this.carService.getCarDetailsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.carClipartImage(this.carDetails)
    });
  }

  getCarImagesById(carId: number) {
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
      this.imagePath = this.carImages[0].imagePath
      console.log(this.imagePath)
    });
  }

  setCurrentCar(carDto: CarDetailsDto) {
    this.currentCar = carDto;
  }
}
