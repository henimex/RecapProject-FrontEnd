import { Color } from '../color';
import { ResponseModelBase} from './responseModelBase';

export interface ColorRM extends ResponseModelBase{
    data:Color[];
}