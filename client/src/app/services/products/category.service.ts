import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/products/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends AbstractService<Category>{

  constructor(
    public httpCl: HttpClient,
    ) { 
      super(httpCl)
      this.route = "products/category";
  }
}
