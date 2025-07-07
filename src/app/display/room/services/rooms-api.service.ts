import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomRequest} from "../model/room.request";

@Injectable({
  providedIn: 'root'
})
export class RoomsApiService extends BaseService<RoomRequest> {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.resourceEndpoint = '/MSRoom/rooms';
  }

  createRoom(room: RoomRequest): Observable<any> {
    return this.httpClient.post(`${this.resourcePath()}`, {
      roomNumber: room.roomNumber,
      type: room.type,
      userId: room.userId
    });
  }

  updateRoom(room: RoomRequest): Observable<any> {
    return this.httpClient.put(`${this.resourcePath()}/${room.roomNumber}`, {
      roomNumber: room.roomNumber,
      type: room.type,
      userId: room.userId
    });
  }

  deleteRoom(roomNumber: number): Observable<any> {
    return this.httpClient.delete(`${this.resourcePath()}/${roomNumber}`, {responseType: 'text'});
  }
}
