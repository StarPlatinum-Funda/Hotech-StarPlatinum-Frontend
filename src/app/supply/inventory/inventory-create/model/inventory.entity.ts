export class Inventory {
  id: number;
  productTitle: string;
  brandName: string;
  productDescription: string;
  Quantity: number;
  rechargeLimit: number;
  providerId: number;
  warehouseId: number;

  constructor(
    id: number,
    productTitle: string,
    brandName: string,
    productDescription: string,
    Quantity: number,
    rechargeLimit: number,
    providerId: number,
    warehouseId: number
  ) {
    this.id = id;
    this.productTitle = productTitle;
    this.brandName = brandName;
    this.productDescription = productDescription;
    this.Quantity = Quantity;
    this.rechargeLimit = rechargeLimit;
    this.providerId = providerId;
    this.warehouseId = warehouseId;
  }

  getInventoryById(inventories: Inventory[], inventoryId: number): Inventory | undefined {
    return inventories.find(inventory => inventory.id === inventoryId);
  }

}


