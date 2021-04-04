import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  test:any;
  saveCC:boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log("PARAMS");
      console.log(params);
      this.paymentForm = this.formBuilder.group({
        carId: ([parseInt(params['carId'])]),
        customerId: [parseInt(params['customerId'])],
        rentDate: [new Date(params['rentDate'])],
        returnDate: [new Date(params['returnDate'])],
        dailyPrice: [parseInt(params['dailyPrice'])],
        daysForRent: [parseInt(params['daysForRent'])],
        totalPrice: [parseInt(params['totalPrice'])],
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

  makePayment(){
    let paymentModel = Object.assign({},this.paymentForm.value);
    this.paymentService.makePayment(paymentModel).subscribe(response=>{
      this.toastrService.info(response.message, "Payment Transaction Information")
    })
  }

  makePaymentSolid(){
    this.paymentService.makePaymentSolid(this.paymentForm);
    this.addToRentals()
  }

  addToRentals(){
    let rentModel = Object.assign({},this.paymentForm.value);
    this.rentalService.addRental(rentModel).subscribe(response=>{
      this.toastrService.info(response.message, "Rental Add Information")
    })
  }

  selectedCard(){
    console.log("test")
  }

  checksavebox(){
    console.log(this.saveCC)
  }

}
