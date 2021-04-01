import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { ResponseModelBase } from '../models/ResponseModels/responseModelBase';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'https://localhost:44327/api/';

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) {}

  makePayment(payment: Payment): Observable<ResponseModelBase> {
    let newPath = this.apiUrl + 'payments/make-payment';
    return this.httpClient.post<ResponseModelBase>(newPath, payment);
  }

  makePaymentSolid(formGroup:FormGroup){
    if (formGroup.valid) {
      let formModel = Object.assign({},formGroup.value);
      this.makePayment(formModel).subscribe(response =>{
        this.toastrService.info(response.message,'Operation Information')
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Something Wrong");
          }
        }
      })
    } else {
      this.toastrService.error("Payment Information Empty Or Invalid Please Check Again","Invalid Information");
    }
  }
}
