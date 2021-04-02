import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/ResponseModels/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44327/api/';
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) {}

  getUserInformation(mail: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/get-by-mail?email=' + mail;
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  getUserById(id: number):Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/get-by-id?id=' + id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }
}
