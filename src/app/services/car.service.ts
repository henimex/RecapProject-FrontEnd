import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarRM } from '../models/ResponseModels/carRM';
import { CarDetailsDtoRM } from '../models/ResponseModels/carDetailsDtoRM';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44327/api/cars/get-all';
  dtoUrl = 'https://localhost:44327/api/cars/get-cd';
  
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<CarRM> {
    return this.httpClient.get<CarRM>(this.apiUrl);
  }

  getCarDetails(): Observable<CarDetailsDtoRM>{
    return this.httpClient.get<CarDetailsDtoRM>(this.dtoUrl)
  }
}
