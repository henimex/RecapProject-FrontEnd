import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorRM } from '../models/ResponseModels/colorRM';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl='https://localhost:44327/api/colors/get-all';
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ColorRM>{
    return this.httpClient.get<ColorRM>(this.apiUrl);
  }
}
