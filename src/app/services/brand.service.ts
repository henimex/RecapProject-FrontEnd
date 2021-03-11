import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandRM } from '../models/ResponseModels/brandRM';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = 'https://localhost:44327/api/brands/get-all';
  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<BrandRM>{
    return this.httpClient.get<BrandRM>(this.apiUrl);
  }
}
