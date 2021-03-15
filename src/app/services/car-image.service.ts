import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = 'https://localhost:44327/api/';

  constructor(private httpClient: HttpClient) {}

  getCarImages(): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'carImages/get-all';
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImageByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + 'carImages/get-by-car-id?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  uploadCarImage(carId: string, selectedFile: File) {
    let newPath = this.apiUrl + 'carImages/add';
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    formData.append('carId', carId);
    this.httpClient.post(newPath, formData).subscribe((response) => {
      console.log(response);
    });
  }

  uploadCarImage2(carId: string, selectedFile: File) {
    let newPath = this.apiUrl + 'carImages/add';
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    formData.append('carId', carId);
    this.httpClient
      .post(newPath, formData, { reportProgress: true, observe: 'events' })
      .subscribe((event) => {
        console.log(event);
      });
  }

  // uploadCarImage(selectedFile:File): Observable<ListResponseModel<CarImage>>{
  //   const formData = new FormData();
  //   let newPath = this.apiUrl + 'carimages/add';

  //   formData.append('image',selectedFile,selectedFile.name)
  //   this.httpClient.post(newPath,formData);
  //}
}
