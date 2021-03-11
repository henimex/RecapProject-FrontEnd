import { CarImage } from '../carImage';
import { ResponseModelBase} from './responseModelBase';

export interface CarImageRM extends ResponseModelBase{
    data:CarImage[];
}