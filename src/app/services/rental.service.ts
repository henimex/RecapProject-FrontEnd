import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalsDto } from '../models/Dto/rentalsDto';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44327/api/rentals/';


  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'get-all'
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalDetails(): Observable<ListResponseModel<RentalsDto>> {
    let newPath = this.apiUrl + 'get-rd'
    return this.httpClient.get<ListResponseModel<RentalsDto>>(newPath);
  }

  getRentalDetailsByCarId(carId:number): Observable<ListResponseModel<RentalsDto>> {
    let newPath = this.apiUrl + 'get-rd-car-id?carId='+carId
    return this.httpClient.get<ListResponseModel<RentalsDto>>(newPath);
  }
}
