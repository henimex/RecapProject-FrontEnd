import { Brand } from '../brand';
import { ResponseModelBase} from './responseModelBase';

export interface BrandRM extends ResponseModelBase{
    data:Brand[];
}