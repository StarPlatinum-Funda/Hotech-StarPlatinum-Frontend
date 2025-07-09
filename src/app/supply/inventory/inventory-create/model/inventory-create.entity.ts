export class CreateInventory{
  productTitle: string;
  brandName: string;
  productDescription: string;
  Quantity: number;
  rechargeLimit: number;
  providerId: number;
  warehouseId: number;

  constructor(
    productTitle: string,
    brandName: string,
    productDescription: string,
    Quantity: number,
    rechargeLimit: number,
    providerId: number,
    warehouseId: number
  ) {
    this.productTitle = productTitle;
    this.brandName = brandName;
    this.productDescription = productDescription;
    this.Quantity = Quantity;
    this.rechargeLimit = rechargeLimit;
    this.providerId = providerId;
    this.warehouseId = warehouseId;
  }
}
