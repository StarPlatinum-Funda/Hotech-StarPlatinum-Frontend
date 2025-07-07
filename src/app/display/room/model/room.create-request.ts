// src/app/display/room/model/room.create.request.ts

export class RoomCreateRequest {
  roomNumber: number;
  type: string;
  userId: number;


  constructor(type: string, roomNumber: number, userId: number) {
    this.type = type;
    this.roomNumber = roomNumber;
    this.userId = 10;
  }
}
