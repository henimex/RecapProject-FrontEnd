export interface RentalsDto {
  id: number;
  carId: number;
  brandId: number;
  brandName: string;
  customerId: number;
  userId: number;
  customerName: string;
  customerSurname: string;
  customerMail: string;
  company: string;
  dailyPrice: number;
  rentDate: Date;
  returnDate: Date;
}
