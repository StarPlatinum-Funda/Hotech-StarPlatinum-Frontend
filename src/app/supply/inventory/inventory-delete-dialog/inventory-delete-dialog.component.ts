import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryApiService } from '../inventory-create/services/inventory-api.service';
import { Inventory } from '../inventory-create/model/inventory.entity';

@Component({
  selector: 'app-inventory-delete-dialog',
  templateUrl: './inventory-delete-dialog.component.html',
  styleUrl: './inventory-delete-dialog.component.css'
})
export class InventoryDeleteDialogComponent {
  InventoryDeleteFormGroup: FormGroup;

  constructor(
    private inventoryService: InventoryApiService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InventoryDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventory
  ) {
    this.InventoryDeleteFormGroup = this.formBuilder.group({
      id: new FormControl(data.id, [Validators.required])
    });
  }

  borrarItem(): void {
    this.inventoryService.delete(this.data.id).subscribe(() => {
      this.dialogRef.close(true); // opcional: pasar true si fue borrado
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false); // opcional: pasar false si se cancela
  }
}
