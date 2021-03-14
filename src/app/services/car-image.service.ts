import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';


@Injectable({
  providedIn: 'root',
})
export class CarImageService {

  apiUrl = 'https://localhost:44327/api/carimages/get-all';
  getByCarIdUrl = 'https://localhost:44327/api/carimages/get-by-car-id?carId='

  constructor(private httpClient: HttpClient) {}

  getCarImages():Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl);
  }

  getCarImageByCarId(id:number):Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.getByCarIdUrl+id);
  }
}
