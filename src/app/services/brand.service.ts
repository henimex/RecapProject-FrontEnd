import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';
import { ResponseModelBase } from '../models/ResponseModels/responseModelBase';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/get-all';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(brandId: number): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/get-by-id'+brandId;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand: Brand): Observable<ResponseModelBase> {
    let newPath = this.apiUrl + 'brands/add';
    return this.httpClient.post<ResponseModelBase>(newPath, brand);
  }

  updateBrand(brand: Brand): Observable<ResponseModelBase> {
    let newPath = this.apiUrl + 'brands/update';
    return this.httpClient.post<ResponseModelBase>(newPath, brand);
  }
}
