import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImageRM } from '../models/ResponseModels/carImageRM';


@Injectable({
  providedIn: 'root',
})
export class CarImageService {

  apiUrl = 'https://localhost:44327/api/carimages/get-all';
  getByCarIdUrl = 'https://localhost:44327/api/carimages/get-by-car-id?carId='

  constructor(private httpClient: HttpClient) {}

  getCarImages():Observable<CarImageRM>{
    return this.httpClient.get<CarImageRM>(this.apiUrl);
  }

  getCarImageByCarId(id:number):Observable<CarImageRM>{
    return this.httpClient.get<CarImageRM>(this.getByCarIdUrl+id);
  }
}
