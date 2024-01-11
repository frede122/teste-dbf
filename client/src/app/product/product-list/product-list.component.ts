import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Product } from 'src/app/models/product/product.model';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'description', 'value', 'action'];
  dataSource: MatTableDataSource<Product>;


  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort || null;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newReg() {
    const dialog = this.dialog.open(ProductFormComponent, { maxWidth: "650px" });
    dialog.afterClosed().subscribe((result : Product) => {
      if(result){
        let products: Product[] = [...DATA, result]
        this.dataSource.data = products;
      }
    });
  }

  edit(product: Product) {
    const dialog = this.dialog.open(ProductFormComponent, { 
      maxWidth: "650px",
      data: product
    });
    dialog.afterClosed().subscribe((result : Product) => {
      if(result){
        let products: Product[] = [...DATA, result]
        this.dataSource.data = products;
      }
    });
  }


  openConfirmDelete(product: Product) {
    const dialog = this.dialog.open(ConfirmDialogComponent, { 
      minWidth: "375px",
      data: { 
        title: `Produto: ${product.name}`,
        message: `Gostaria de excluir o produto: ${product.name}?`
      } 
    });
    dialog.afterClosed().subscribe((result) => {
      if (result)
        this.delete(product);
    });
  }

  delete(product: Product){
    let data = this.dataSource.data;
    data.splice(data.indexOf(product), 1);
    this.dataSource.data = data;
  }

}


const DATA: Product[] = [
  { id: 1, name: 'maça', value: 1.00, description: "descricao A", category: "fruta" },
  { id: 2, name: 'pera', value: 4.06, description: "descricao B", category: "fruta" },
  { id: 3, name: 'melancia', value: 6.94, description: "descricao C", category: "fruta" },
  { id: 4, name: 'mamão', value: 9.22, description: "descricao D", category: "fruta" },
  { id: 5, name: 'uva', value: 10.81, description: "descricao F", category: "fruta" },
  { id: 6, name: 'jabuticaba', value: 12.07, description: "descricao G", category: "fruta" },
  { id: 7, name: 'goiaba', value: 14.67, description: "descricao H", category: "fruta" },
  
];