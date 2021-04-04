import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';
import { ResponseModelBase } from '../models/ResponseModels/responseModelBase';
import { SingleResponseModel } from '../models/ResponseModels/singleResponseModel';
import { UserCard } from '../models/userCard';

@Injectable({
  providedIn: 'root',
})
export class UserCardService {
  apiUrl = 'https://localhost:44327/api/userCards/';

  constructor(private httpClient: HttpClient) {}

  saveUserCreditCard(userCard: UserCard) {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModelBase>(newPath, userCard);
  }

  getUserCards(userId: number): Observable<ListResponseModel<UserCard>> {
    let newPath = this.apiUrl + 'get-all-by-user-id?id=' + userId;
    return this.httpClient.get<ListResponseModel<UserCard>>(newPath);
  }

  getUserSavedCard(cardId: number): Observable<SingleResponseModel<UserCard>> {
    let newPath = this.apiUrl + 'get-by-card-id?id=' + cardId;
    return this.httpClient.get<SingleResponseModel<UserCard>>(newPath);
  }

  updateUserCreditCard(userCard: UserCard) {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModelBase>(newPath, userCard);
  }

  deleteUserCreditCard(userCard: UserCard) {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModelBase>(newPath, userCard);
  }
}
