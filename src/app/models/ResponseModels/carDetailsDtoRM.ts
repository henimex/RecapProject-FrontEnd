import { CarDetailsDto } from '../Dto/carDetailDto';
import { ResponseModelBase } from './responseModelBase';

export interface CarDetailsDtoRM extends ResponseModelBase {
  data: CarDetailsDto[];
}
