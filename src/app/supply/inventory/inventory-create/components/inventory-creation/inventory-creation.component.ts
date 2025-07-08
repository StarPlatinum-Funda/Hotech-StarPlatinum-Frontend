import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryCreateDialogComponent } from '../inventory-create-dialog/inventory-create-dialog.component';
import { Inventory } from '../../model/inventory.entity';
import { InventoryApiService } from '../../services/inventory-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventory-creation',
  templateUrl: './inventory-creation.component.html',
  styleUrl: './inventory-creation.component.css'
})
export class InventoryCreationComponent {
  @Output() itemCreated = new EventEmitter<Inventory>();
  selectedItem: Inventory | null = null;

  constructor(
    private dialog: MatDialog,
    private inventoryApi: InventoryApiService,
    private snackBar: MatSnackBar
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(InventoryCreateDialogComponent, {
      data: new Inventory(0, '', '', '', 0, 0, 0, 0)
    });

    dialogRef.afterClosed().subscribe((result: Inventory | undefined) => {
      if (result) {
        this.inventoryApi.create(result).subscribe({
          next: (createdInventory) => {
            this.selectedItem = createdInventory;
            this.itemCreated.emit(createdInventory);
            this.snackBar.open('Inventory created successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Failed to create inventory', 'Close', { duration: 3000 });
            console.error('Error creating inventory:', err);
          }
        });
      }
    });
  }
}
