import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RoomRequest} from "../../model/room.request";
import {RoomCreateDialogComponent} from "../room-create-dialog/room-create-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RoomDialogData} from "../../model/room.dialog.data";
import {RoomsApiService} from "../../services/rooms-api.service";

@Component({
  selector: 'app-rooms-card',
  templateUrl: './rooms-card.component.html',
  styleUrl: './rooms-card.component.css'
})
export class RoomsCardComponent {

  @Input() room!: RoomRequest;
  @Output() deletedRoomEvent = new EventEmitter<number>();
  @Output() clicked = new EventEmitter<unknown>();
  Menu: boolean;

  constructor(private dialog: MatDialog, private roomsApiService: RoomsApiService) {
    this.Menu = false;
  }

  delete() {
    this.roomsApiService.deleteRoom(this.room.roomNumber).subscribe(() => {
      this.deletedRoomEvent.emit(this.room.roomNumber);
    });
  }

  clickedRoom() {
    if (!this.Menu) {
      console.log('Clicked');
      this.clicked.emit();
    }
  }

  clickedMenu() {
    this.Menu = true;
  }

  editRoom(room: RoomRequest): void {
    const dialogRef = this.dialog.open(RoomCreateDialogComponent, {
      width: '350px',
      data: {
        isUpdate: true,
        type: room.type,
        roomNumber: room.roomNumber,
        userId: room.userId
      } as RoomDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.clicked.emit();
    });
  }
}
