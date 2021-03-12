import { CarDetailsDto } from '../Dto/carDetailDto';
import { ResponseModelBase } from './responseModelBase';

export interface CarDetailsRM extends ResponseModelBase {
  data: CarDetailsDto[];
}
