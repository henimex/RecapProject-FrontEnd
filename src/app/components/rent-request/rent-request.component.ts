import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.rentDate = params['rentDate']
      this.returnDate = params['returnDate']
      this.carId = params['carId']
      this.dailyPrice=params['dailyPrice']
      this.customerId=params['customerId']
      this.daily2 = params['dp2']
      this.rentType=params['rtype']
      console.log(params)
    });
    this.calculateDailyPrice(this.rentDate,this.returnDate,this.daily2,this.rentType)
  }

  createRentForm(): void {
    this.rentForm = this.formBuilder.group({
      carId:[this.carId],
      customerId:[this.customerId],
      rentDate:[this.rentDate],
      returnDate:[this.returnDate],
      dailyPrice:[this.dailyPrice]
    })
  }

  createNaviParams(){

  }

  calculateDailyPrice(rentDate:Date,returnDate:Date,dailyPrice:number,rentType:string) {
    let rentD = new Date(rentDate)
    let returnD = new Date(returnDate)
    
    let day = (returnD.getTime() - rentD.getTime()) / (1000 * 3600 * 24)
    console.log(day*dailyPrice)
    console.log((dailyPrice - ((dailyPrice * 10) / 100)) * day)
    console.log((dailyPrice - ((dailyPrice * 20) / 100)) * day)


    if (rentType === 's') { this.calculatedDailyPrice = dailyPrice * day } 
    else if (rentType ==='t' && day >= 30 ) { this.calculatedDailyPrice = (dailyPrice - ((dailyPrice * 10) / 100)) * day }
    else if (rentType ==='v' && day >= 365 ){ this.calculatedDailyPrice = (dailyPrice - ((dailyPrice * 20) / 100)) * day }
     else{
      console.log("DailyPrice can not be calculated")

    }

    console.log("Rent Date : " + rentDate)
    console.log("Return Date : " + returnDate)
    console.log("Days Between : " + day)

    return 1
  }
}
