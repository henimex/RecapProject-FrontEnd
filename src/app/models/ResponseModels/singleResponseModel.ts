import { ResponseModelBase } from './responseModelBase';

export interface SingleResponseModel<T> extends ResponseModelBase {
  data: T;
}
