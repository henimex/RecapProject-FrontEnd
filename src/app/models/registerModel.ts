import { TokenModel } from "./tokenModel";

export interface RegisterModel extends TokenModel {
    email:string;
    password:string;
    firstName:string;
    lastName:string;
}