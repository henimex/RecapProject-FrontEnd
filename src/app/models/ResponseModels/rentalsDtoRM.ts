import { ResponseModelBase } from "./responseModelBase";
import { RentalsDto } from "../Dto/rentalsDto";

export interface RentalsDtoRM extends ResponseModelBase {
  data: RentalsDto[];
}
