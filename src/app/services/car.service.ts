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
  apiUrl = 'https://localhost:44327/api/cars/get-all';
  dtoUrl = 'https://localhost:44327/api/cars/get-cd';
  
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>> (this.apiUrl);
  }

  getCarDetails(): Observable<ListResponseModel<CarDetailsDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailsDto>>(this.dtoUrl)
  }
}
