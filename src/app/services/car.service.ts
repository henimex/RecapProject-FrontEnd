import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';
import { Car } from '../models/car';
import { CarDetailsDto } from '../models/Dto/carDetailDto';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44327/api/';
  
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/get-all'
    return this.httpClient.get<ListResponseModel<Car>> (newPath);
  }
  
  getCarDetails(): Observable<ListResponseModel<CarDetailsDto>> {
    let newPath = this.apiUrl + 'cars/get-cd'
    return this.httpClient.get<ListResponseModel<CarDetailsDto>> (newPath)
  }

  getCarDetailsByBrand(brandId: number): Observable<ListResponseModel<CarDetailsDto>> {
    let newPath = this.apiUrl + 'cars/get-cd-brandId?id=' + brandId
    return this.httpClient.get<ListResponseModel<CarDetailsDto>> (newPath)
  }

  getCarDetailsByColor(colorId: number): Observable<ListResponseModel<CarDetailsDto>> {
    let newPath = this.apiUrl + 'cars/get-cd-colorId?id=' + colorId
    return this.httpClient.get<ListResponseModel<CarDetailsDto>> (newPath)
  }
}
