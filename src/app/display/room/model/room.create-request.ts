// src/app/display/room/model/room.create.request.ts

export class RoomCreateRequest {
  roomNumber: number;
  type: string;
  userId: number;


  constructor(firstName: string, lastName: string, type: string, state: string, roomNumber: number, initialDate: Date, finalDate: Date) {
    this.type = type;
    this.roomNumber = roomNumber;
    this.userId = 10;
  }
}
