import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';
import { ResponseModelBase } from '../models/ResponseModels/responseModelBase';
import { SingleResponseModel } from '../models/ResponseModels/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44327/api/';
  constructor(
    private httpClient: HttpClient, 
    private toastrService: ToastrService
    ) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/get-all';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(brandId: number): Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/get-by-id?id='+brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  addBrand(brand: Brand): Observable<ResponseModelBase> {
    let newPath = this.apiUrl + 'brands/add';
    return this.httpClient.post<ResponseModelBase>(newPath, brand);
  }

  updateBrand(brand: Brand): Observable<ResponseModelBase> {
    let newPath = this.apiUrl + 'brands/update';
    return this.httpClient.post<ResponseModelBase>(newPath, brand);
  }

  deleteBrand(brand: Brand): Observable<ResponseModelBase> {
    let newPath = this.apiUrl + 'brands/delete';
    return this.httpClient.post<ResponseModelBase>(newPath, brand);
  }

  addNewBrandSolid(formGroup:FormGroup){
    if (formGroup.valid) {
      let brandModel = Object.assign({},formGroup.value);
      this.addBrand(brandModel).subscribe((response) => {
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

  updateBrandSolid(formGroup:FormGroup){
    if (formGroup.valid) {
      let brandModel = Object.assign({},formGroup.value);
      this.updateBrand(brandModel).subscribe((response) => {
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
