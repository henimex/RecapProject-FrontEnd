import { ResponseModelBase } from "./responseModelBase";

export interface ListResponseModel<T> extends ResponseModelBase{
    data: T[];
}