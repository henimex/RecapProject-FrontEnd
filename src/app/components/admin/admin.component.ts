import { Component, OnInit } from '@angular/core';
import { CarDetailsDto } from 'src/app/models/Dto/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  carDetails: CarDetailsDto[];
  dataLoaded = false;
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCarDetails();
  }


  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  deleteCar(carDto:CarDetailsDto){

  }

}
