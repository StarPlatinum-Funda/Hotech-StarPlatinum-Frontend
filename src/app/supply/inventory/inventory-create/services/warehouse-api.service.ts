import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseApiService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/MSInventory/warehouse';
  }
}