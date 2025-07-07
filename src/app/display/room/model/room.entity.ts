export class Room {
  roomNumber: number;
  type: string;
  userId: number;

  constructor(type: string, roomNumber: number, userId: number) {
    this.type = type;
    this.roomNumber = roomNumber;
    this.userId = userId;
  }
}
