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
  apiUrl = 'https://localhost:44327/api/rentals/get-all';
  detailUrl = 'https://localhost:44327/api/rentals/get-rd';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }

  getRentalDetails(): Observable<ListResponseModel<RentalsDto>> {
    return this.httpClient.get<ListResponseModel<RentalsDto>>(this.detailUrl);
  }
}
