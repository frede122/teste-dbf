import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
import { Product } from 'src/app/models/products/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractService<Product>{
  protected photoUrl = "products/product/photo"
  constructor(
    public httpClient: HttpClient,
    
    ) { 
      super(httpClient)
      this.route = "products/product"
  }

  public uploadPhoto(photo: any): Observable<any>{
    const formData = new FormData();
    formData.append('file', photo, photo.name);
    return this.http.post<Product>(`${this.url}/${this.photoUrl}`, formData);
  }
}
