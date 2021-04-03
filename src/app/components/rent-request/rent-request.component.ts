import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rent-request',
  templateUrl: './rent-request.component.html',
  styleUrls: ['./rent-request.component.css'],
})
export class RentRequestComponent implements OnInit {
  rentForm: FormGroup;
  rentDate: Date;
  returnDate: Date;
  carId:number;
  dailyPrice:number;
  customerId:number;
  daily2:number;
  rentType:string;
  calculatedDailyPrice:number;
  daysForRent:number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.rentDate = params['rentDate']
      this.returnDate = params['returnDate']
      this.carId = params['carId']
      this.dailyPrice=params['dailyPrice']
      this.customerId=params['customerId']
      this.daily2 = params['dp2']
      this.rentType=(params['rentType']).toString()
      console.log(params)
    });
    console.log("rent type 1: " + this.rentType)
    this.calculateDailyPrice(this.rentDate,this.returnDate,this.daily2,this.rentType)
    this.createRentForm();
  }

  createRentForm(): void {
    this.rentForm = this.formBuilder.group({
      carId:[this.carId],
      customerId:[this.customerId],
      rentDate:[this.rentDate],
      returnDate:[this.returnDate],
      dailyPrice:[this.daily2 + ' TL'],
      daysForRent:[this.daysForRent + ' Days'],
      calculatedDailyPrice:[this.calculatedDailyPrice + ' TL'],
    })
  }

  createNaviParams(){
    //TODO:: CreateMethod for ngOnInit Codes
  }

  calculateDailyPrice(rentDate:Date,returnDate:Date,dailyPrice:number,rentType:string):number {
    let rentD = new Date(rentDate)
    let returnD = new Date(returnDate)
    let day = (returnD.getTime() - rentD.getTime()) / (1000 * 3600 * 24)
    this.daysForRent = day
    //TODO:: Disable
    console.log(day*dailyPrice)
    console.log((dailyPrice - ((dailyPrice * 10) / 100)) * day)
    console.log((dailyPrice - ((dailyPrice * 20) / 100)) * day)

    if (rentType === 't' && day >= 30) {
      this.calculatedDailyPrice = (dailyPrice - (dailyPrice * 10) / 100) * day;
      this.toastrService.success('For ' + day + ' days Travaller Packege Price : ' + this.calculatedDailyPrice + " TL", "Traveller (10% Discounted)");
    } else if (rentType === 'v' && day >= 365) {
      this.calculatedDailyPrice = (dailyPrice - (dailyPrice * 20) / 100) * day;
      this.toastrService.success('For ' + day + ' days Voyager Packege Price : ' + this.calculatedDailyPrice + " TL", "Voyager (20% Discounted)");
    } else if (rentType === 's' || rentType === 't' || rentType === 'v') {
      this.calculatedDailyPrice = dailyPrice * day;
      this.toastrService.success('For ' + day + ' days Suggested Packege Price : ' + this.calculatedDailyPrice + " TL", "Suggested (No Discount)");;
    } else {
      this.toastrService.error('DailyPrice can not be calculated check Form Informations', 'Calculation Failed');
    }

    //TODO:: Disable
    // console.log("Rent Date : " + rentDate)
    // console.log("Return Date : " + returnDate)
    // console.log("Days Between : " + day)
    console.log("Calculated Price : " + this.calculatedDailyPrice)

    return this.calculatedDailyPrice
  }

  rentIt(){
    let naviExtras : NavigationExtras ={
      queryParams: {
        "rentDate":this.rentDate,
        "returnDate":this.returnDate,
        "carId":this.carId,
        "customerId":this.customerId,
        "daysForRent":this.daysForRent,
        "dailyPrice":this.daily2,
        "totalPrice":this.calculatedDailyPrice
      }
    };
    this.router.navigate(['/payments'], naviExtras)
    this.toastrService.success("Redirection to the Payment Page "," Payment Transaction")
  }

  cancelRent(){
    console.log("Rent Cancel")
  }
}
