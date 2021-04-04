import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { CarDetailsDto } from 'src/app/models/Dto/carDetailDto';
import { User } from 'src/app/models/user';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { UserService } from 'src/app/services/user.service';

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
  filterTextColor='';
  filterTextBrand='';
  dataLoaded = false;
  user:User;
  customerId:any;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        console.log("car component init cond 1");
        this.getCarDetailsByBrand(params.brandId);
      } else if (params['colorId']) {
        console.log("car component init cond 2");
        this.getCarDetailsByColor(params.colorId);
      } else if (params['filterColor'] && params['filterBrand']){
        console.log("car component init cond 3");
        console.log("Gelen color ıd : "+ params.filterColor);
        console.log("Gelen brand ıd : "+ params.filterBrand);
        this.getCarDetailsByColorAndBrand(params['filterColor'], params['filterBrand'])
      } else {
        console.log("car component init cond 4");
        this.getCarDetails();
        this.getUserInfo()
      }
    });
    
  }

  getUserInfo() {
    let loggedUserMail = localStorage.getItem('hd_rc_u_mail');
    let infoModel = Object.assign({ email: loggedUserMail });
    this.userService.getUserInformation(infoModel).subscribe((response) => {
      this.user = response.data
      this.customerId = response.data.id
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

  getCarDetailsByColorAndBrand(colorId: number, brandId: number){
    this.carService.getCarDetailsByColorAndBrand(colorId,brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.carClipartImage(this.carDetails)
      if (this.carDetails.length === 0 ) {
        this.toastrService.error("No Cars Available With Filtered Specs","Empty Result")
      }
    })
  }

  setCurrentCar(carDto: CarDetailsDto) {
    this.currentCar = carDto;
  }
}
