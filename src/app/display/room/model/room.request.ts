export class RoomRequest {
  roomNumber: number;
  type: string;
  userId: number;

  constructor( roomNumber: number, type: string, userId: number) {
    this.roomNumber = roomNumber;
    this.type = type;
    this.userId = userId;
  }
}
