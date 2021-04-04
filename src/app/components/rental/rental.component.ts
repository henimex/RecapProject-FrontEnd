import { Component, OnInit } from '@angular/core';
import { RentalsDto } from 'src/app/models/Dto/rentalsDto';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  rentalDetails: RentalsDto[] = [];
  dataLoaded: boolean = true;
  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentals();
    this.getRentalDetails();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded=true;
    });
  }
}
