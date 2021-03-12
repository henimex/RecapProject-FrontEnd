import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalRM } from '../models/ResponseModels/rentalRM';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44327/api/rentals/get-all';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<RentalRM> {
    return this.httpClient.get<RentalRM>(this.apiUrl);
  }
}
