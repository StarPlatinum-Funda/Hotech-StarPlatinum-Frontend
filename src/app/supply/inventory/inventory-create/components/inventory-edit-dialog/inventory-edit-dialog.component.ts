import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inventory } from '../../model/inventory.entity';
import { Provider } from '../../model/provider.entity';
import { Warehouse } from '../../model/warehouse.entity';
import { ProviderApiService } from '../../services/provider-api.service';
import { WarehouseApiService } from '../../services/warehouse-api.service';

@Component({
  selector: 'app-inventory-edit-dialog',
  templateUrl: './inventory-edit-dialog.component.html',
  styleUrl: './inventory-edit-dialog.component.css'
})
export class InventoryEditDialogComponent implements OnInit {
  InventoryItemFormGroup: FormGroup;

  providers: Provider[] = [];
  warehouses: Warehouse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InventoryEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventory,
    private providerApi: ProviderApiService,
    private warehouseApi: WarehouseApiService
  ) {
    this.InventoryItemFormGroup = this.formBuilder.group({
      itemTitle: new FormControl(data.itemTitle, [Validators.required]),
      itemDescription: new FormControl(data.itemDescription, [Validators.required]),
      brandName: new FormControl(data.brandName, [Validators.required]),
      itemQuantity: new FormControl(data.itemQuantity, [Validators.required, Validators.pattern(/^\d+$/)]),
      rechargeLimit: new FormControl(data.rechargeLimit, [Validators.required, Validators.pattern(/^\d+$/)]),
      providerId: new FormControl(data.providerId, [Validators.required]),
      warehouseId: new FormControl(data.warehouseId, [Validators.required])
    });
  }

  ngOnInit(): void {
  this.providerApi.getAll().subscribe((data: Provider[]) => this.providers = data);
  this.warehouseApi.getAll().subscribe((data: Warehouse[]) => this.warehouses = data);

}


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.InventoryItemFormGroup.valid) {
      const formValues = this.InventoryItemFormGroup.value;

      const updateItem = new Inventory(
        this.data.id,
        formValues.itemTitle,
        formValues.itemDescription,
        formValues.brandName,
        formValues.itemQuantity,
        formValues.rechargeLimit,
        formValues.providerId,
        formValues.warehouseId
      );

      this.dialogRef.close(updateItem);
    }
  }
}
