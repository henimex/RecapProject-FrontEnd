import { Car } from '../car';
import { ResponseModelBase} from './responseModelBase';

export interface CarRM extends ResponseModelBase{
    data:Car[];
}