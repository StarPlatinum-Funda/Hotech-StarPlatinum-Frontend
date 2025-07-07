import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomRequest} from "../../model/room.request";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RoomsApiService} from "../../services/rooms-api.service";
import {catchError} from "rxjs/operators";
import {of} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoomDialogData} from '../../model/room.dialog.data';
import {RoomCreateRequest} from "../../model/room.create-request";
import {RoomUpdateRequest} from "../../model/room.update-request";

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-create-dialog.component.html',
  styleUrls: ['./room-create-dialog.component.css']
})
export class RoomCreateDialogComponent implements OnInit {

  typeOptions = ['STANDARD', 'SUITE', 'DELUXE_SUITE'];
  taskForm: FormGroup;
  roomNumberExists: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RoomCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomDialogData,
    private roomsApiService: RoomsApiService,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.formBuilder.group({
      type: new FormControl('', [
        Validators.required
      ]),
      roomNumber: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]*$')
      ]),
      userId: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]*$')
      ])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.taskForm.get('roomNumber')?.valueChanges.subscribe(roomNumber => {
      this.checkRoomNumberExists(roomNumber);
    });
    if (this.data.isUpdate) {
      this.setUpdateValues();
    }
  }

  onSubmit(): void {
    if (this.data.isUpdate) {
      this.updateRoom();
    } else {
      this.createRoom();
    }
  }

  setUpdateValues(): void {
    this.taskForm.setValue({
      type: this.data.type.toUpperCase(),
      roomNumber: this.data.roomNumber,
      userId: this.data.userId
    });
  }

  checkRoomNumberExists(roomNumber: number): void {
    this.roomsApiService.getAll().subscribe(existingRooms => {
      this.roomNumberExists = existingRooms.some((room: RoomRequest) => room.roomNumber === roomNumber && room.userId !== this.data.userId);
    });
  }

  createRoom(): void {
    const formValues = this.taskForm.value;
    const newRoom = new RoomCreateRequest(
      formValues.type,
      formValues.roomNumber,
      formValues.userId
    );

    this.roomsApiService.createRoom(newRoom).pipe(
      catchError((error) => {
        this.snackBar.open('An error occurred while creating the room', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        console.log(response);
        this.dialogRef.close(response);
        this.snackBar.open('Room created successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    });
  }

  updateRoom(): void {
    const formValues = this.taskForm.value;
    const updatedRoom = new RoomUpdateRequest(
      formValues.type,
      formValues.roomNumber,
      formValues.userId
    );

    this.roomsApiService.updateRoom(updatedRoom).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        this.snackBar.open('An error occurred while updating the room', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        console.log(response);
        this.dialogRef.close(response);
        this.snackBar.open('Room updated successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    });
  }
}
