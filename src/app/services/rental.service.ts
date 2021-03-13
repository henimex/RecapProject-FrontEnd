import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalRM } from '../models/ResponseModels/rentalRM';
import { RentalsDtoRM } from '../models/ResponseModels/rentalsDtoRM';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44327/api/rentals/get-all';
  detailUrl = 'https://localhost:44327/api/rentals/get-rd';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<RentalRM> {
    return this.httpClient.get<RentalRM>(this.apiUrl);
  }

  getRentalDetails(): Observable<RentalsDtoRM> {
    return this.httpClient.get<RentalsDtoRM>(this.detailUrl);
  }
}
