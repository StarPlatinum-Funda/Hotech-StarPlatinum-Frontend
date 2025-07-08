import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Inventory} from "../../model/inventory.entity";
import {Provider} from "../../model/provider.entity";
import {Warehouse} from "../../model/warehouse.entity";
import {ProviderApiService} from "../../services/provider-api.service";
import {WarehouseApiService} from "../../services/warehouse-api.service";

@Component({
  selector: 'app-inventory-create-dialog',
  templateUrl: './inventory-create-dialog.component.html',
  styleUrl: './inventory-create-dialog.component.css'
})
export class InventoryCreateDialogComponent implements OnInit {
  InventoryItemFormGroup: FormGroup;
  providers: Provider[] = [];
  warehouses: Warehouse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InventoryCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventory,
    private providerApi: ProviderApiService,
    private warehouseApi: WarehouseApiService
  ) {
    this.InventoryItemFormGroup = this.formBuilder.group({
      itemTitle: new FormControl('', [Validators.required]),
      itemDescription: new FormControl('', [Validators.required]),
      brandName: new FormControl('', [Validators.required]),
      itemQuantity: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      rechargeLimit: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      providerId: new FormControl('', [Validators.required]),
      warehouseId: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.providerApi.getAll().subscribe(data => this.providers = data);
    this.warehouseApi.getAll().subscribe(data => this.warehouses = data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.InventoryItemFormGroup.valid) {
      const formValues = this.InventoryItemFormGroup.value;

      const selectedData = new Inventory(
        0,
        formValues.itemTitle,
        formValues.itemDescription,
        formValues.brandName,
        formValues.itemQuantity,
        formValues.rechargeLimit,
        formValues.providerId,
        formValues.warehouseId
      );

      this.dialogRef.close(selectedData);
    }
  }
}
