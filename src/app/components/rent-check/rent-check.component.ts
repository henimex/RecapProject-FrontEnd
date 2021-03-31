import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-check',
  templateUrl: './rent-check.component.html',
  styleUrls: ['./rent-check.component.css'],
})
export class RentCheckComponent implements OnInit {
  carId: number;
  rentable: boolean = false;
  rentalAddForm: FormGroup;
  disabledDateList: any[];
  dateRange: any[];
  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService
  ) {
    this.datePickerConfig = Object.assign(
      {},
      {
        containerClass: 'theme-default',
        showWeekNumbers: false,
        minDate: new Date(2021, 0, 1),
        rangeInputFormat: 'DD-MM-YYYY',
        showClearButton: true,
      }
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getDisabledDates(params['carId']);
        this.carId = parseInt(params['carId']);
        this.createRentAddForm();
      } else {
      }
    });

    this.disabledDateList = [];
  }

  getDisabledDates(carId: number) {
    //ulen ne ugrastım seninle be teh...
    this.rentalService.getDisabledDates(carId).subscribe((response: any[]) => {
      if (response.length > 0) {
        for (let i = 0; i < response.length; i++) {
          this.disabledDateList.push(new Date(response[i].toString()));
        }
      }
    });
  }

  checkRentAvailability() {
    let rentalModel = Object.assign(
      {
        rentDate: this.rentalAddForm.get('dateRange').value[0],
        returnDate: this.rentalAddForm.get('dateRange').value[1],
      },
      this.rentalAddForm.value
    );
    this.rentalService.checkRentAvailability(rentalModel).subscribe(
      (response) => {
        console.log(response);
        if (response.success) {
          console.log('true geldi');
          this.toastrService.success(response.message, 'Available');
        }
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message, 'NOT Available');
      }
    );
  }

  createRentAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      //customerId: ['', Validators.required],
      dateRange: ['', Validators.required],
      daiylPrice: [1, Validators.required],
    });
    console.log(this.rentalAddForm.value);
  }
}
