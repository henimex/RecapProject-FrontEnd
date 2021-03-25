import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';
import { ResponseModelBase } from '../models/ResponseModels/responseModelBase';
import { SingleResponseModel } from '../models/ResponseModels/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {

  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient: HttpClient,private toastrService: ToastrService) {}

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + 'colors/get-all'
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getColorById(colorId: number): Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl + 'colors/get-by-id?id='+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

  addColor(color: Color): Observable<ResponseModelBase> {
    let newPath = this.apiUrl + 'colors/add'
    return this.httpClient.post<ResponseModelBase>(newPath, color);
  }

  updateColor(color:Color): Observable<ResponseModelBase> {
    let newPath = this.apiUrl + 'colors/update'
    return this.httpClient.post<ResponseModelBase>(newPath, color);
  }  
  
  deleteColor(color: Color) {
    let newPath = this.apiUrl + 'colors/delete'
    return this.httpClient.post<ResponseModelBase>(newPath, color);
  }

  addNewColorSolid(formGroup:FormGroup){
    if (formGroup.valid) {
      let colorModel = Object.assign({},formGroup.value);
      this.addColor(colorModel).subscribe((response) => {
        this.toastrService.success(response.message,"Operation Successfull");
      },responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Something Wrong");
          }
        }
      })
    } else {
      this.toastrService.error("Form Information Empty Or Invalid Please Check Again","Invalid Information");
    }
  }

  updateColorSolid(formGroup:FormGroup){
    if (formGroup.valid) {
      let colorModel = Object.assign({},formGroup.value);
      this.updateColor(colorModel).subscribe((response) => {
        this.toastrService.success(response.message,"Operation Successfull");
      },responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Something Wrong");
          }
        }
      })
    } else {
      this.toastrService.error("Form Information Empty Or Invalid Please Check Again","Invalid Information");
    }
  }
}
