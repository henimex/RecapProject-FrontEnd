import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  //#region ManuelData
  
  //#endregion

  cars: Car[] = [];
  brands: Brand[] = [];
  dataLoaded = false;
  constructor(
    private carService: CarService, 
    private brandService: BrandService) {}

  ngOnInit(): void {
    this.getCars();
    this.getBrands();
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      console.log(response.message)
      console.log(response.data)
      this.dataLoaded = true;
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
      console.log(response.data)
    })
  }
}
