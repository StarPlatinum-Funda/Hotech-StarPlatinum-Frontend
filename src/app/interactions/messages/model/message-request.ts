export class MessageRequest {
  id: number;
  receptor: string;
  sender: string;
  content: string;
  status: string;
  notificationId: number;
  userId: number;

  constructor(id: number, receptor: string, sender: string, content: string ,status: string, notificationId: number, userId: number) {
    this.id = id;
    this.receptor = receptor;
    this.sender = sender;
    this.content = content;
    this.status = status;
    this.notificationId = notificationId;
    this.userId = userId;
  }
}
