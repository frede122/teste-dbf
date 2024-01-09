import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CategoryFormComponent } from './product/category/category-form/category-form.component';
import { CategoryListComponent } from './product/category/category-list/category-list.component';

const routes: Routes = [
  { path: '', component: ProductListComponent},
  { path: 'product-list', component: ProductListComponent},
  { path: 'category-list', component: CategoryListComponent},
  { path: 'product-form', component: ProductFormComponent},
  { path: 'category-form', component: CategoryFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
