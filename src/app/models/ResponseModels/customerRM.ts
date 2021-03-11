import { Customer } from '../customer';
import { ResponseModelBase} from './responseModelBase';

export interface CustomerRM extends ResponseModelBase{
    data:Customer[];
}