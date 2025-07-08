export class Inventory {
  id: number;
  itemTitle: string;
  itemDescription: string;
  brandName: string;
  itemQuantity: number;
  rechargeLimit: number;
  providerId: number;
  warehouseId: number;

  constructor(
    id: number,
    itemTitle: string,
    itemDescription: string,
    brandName: string,
    itemQuantity: number,
    rechargeLimit: number,
    providerId: number,
    warehouseId: number
  ) {
    this.id = id;
    this.itemTitle = itemTitle;
    this.itemDescription = itemDescription;
    this.brandName = brandName;
    this.itemQuantity = itemQuantity;
    this.rechargeLimit = rechargeLimit;
    this.providerId = providerId;
    this.warehouseId = warehouseId;
  }

  getInventoryById(inventories: Inventory[], inventoryId: number): Inventory | undefined {
    return inventories.find(inventory => inventory.id === inventoryId);
  }

}


