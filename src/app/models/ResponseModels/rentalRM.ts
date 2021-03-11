import { Rental } from '../rental';
import { ResponseModelBase} from './responseModelBase';

export interface RentalRM extends ResponseModelBase{
    data:Rental[];
}