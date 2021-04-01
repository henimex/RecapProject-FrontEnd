export interface Payment{
    id: number;
    customerId: number;
    carId:number;
    rentDate: Date;
    returnDate: Date;
    dailyPrice: number;
    daysForRent: number;
    totalPrice: number;
    cardHolderName: string;
    cardNumber: number;
    validM: number;
    validY: number;
    cvc: string;
}