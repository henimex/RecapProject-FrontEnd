import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCard } from 'src/app/models/userCard';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserCardService } from 'src/app/services/user-card.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  creditCardForm: FormGroup;
  test:any;
  saveCC:boolean = false;
  userId:number;
  userCards:UserCard[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private userCardService: UserCardService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = parseInt(params['customerId'])
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
        expMonth: ['', Validators.required],
        expYear: ['', Validators.required],
        cvc: ['', Validators.required],
        saveCreditCard:[''],
        alias: ['']
      });
    });

    console.log("Form ")
    console.log(this.paymentForm.value)
    this.getUserCards(this.userId);
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
    this.saveCreditCard();
  }

  addToRentals(){
    let rentModel = Object.assign({},this.paymentForm.value);
    this.rentalService.addRental(rentModel).subscribe(response=>{
      this.toastrService.info(response.message, "Rental Add Information")
    })
  }

  selectedCard(savedCardId:number){
    this.userCardService.getUserSavedCard(savedCardId).subscribe(response=>{
      console.log(response)
      this.paymentForm = this.formBuilder.group({
        cardHolderName: [response.data.cardHolderName],
        cardNumber: [response.data.cardNumber],
        expMonth: [response.data.expMonth],
        expYear: [response.data.expYear],
        cvc: [response.data.cvc],
        alias: [response.data.alias]
      })
    })
  }

  checksavebox(){
    console.log(this.saveCC)
  }

  saveCreditCard(){
    let ccinformationModel = Object.assign(
      {
        userId:this.userId
      },this.paymentForm.value);
    this.userCardService.saveUserCreditCard(ccinformationModel).subscribe(response =>{
      this.toastrService.success(response.message,"Credit Card Save Information")
    })
  }

  getUserCards(userId:number){
    this.userCardService.getUserCards(userId).subscribe(response => {
      this.userCards = response.data;
    })
  }

}
