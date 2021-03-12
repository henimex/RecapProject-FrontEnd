import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerRM } from '../models/ResponseModels/customerRM';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44327/api/customers/get-all';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<CustomerRM> {
    return this.httpClient.get<CustomerRM>(this.apiUrl);
  }
}
