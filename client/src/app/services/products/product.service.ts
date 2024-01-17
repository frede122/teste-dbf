import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractService<any>{

  constructor(
    public httpClient: HttpClient,
    
    ) { 
      super(httpClient)
      this.route = "products/product"
  }
}
