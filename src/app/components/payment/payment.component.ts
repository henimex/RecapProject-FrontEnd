import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log("PARAMS");
      console.log(params);
      this.paymentForm = this.formBuilder.group({
        carId: [params['carId']],
        customerId: [params['customerId']],
        rentDate: [params['rentDate']],
        returnDate: [params['returnDate']],
        dailyPrice: [params['dailyPrice']],
        daysForRent: [params['daysForRent']],
        totalPrice: [params['totalPrice']],
        cardHolderName: ['', Validators.required],
        cardNumber: ['', Validators.required],
        validM: ['', Validators.required],
        validY: ['', Validators.required],
        cvc: ['', Validators.required],
      });
    });

    console.log("Form ")
    console.log(this.paymentForm.value)
  }


}
