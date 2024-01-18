import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/models/products/product.model';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProductService } from 'src/app/services/products/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['id', 'name', 'category', 'description', 'value', 'action'];
  dataSource: MatTableDataSource<Product>;
  loading: boolean = true;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    public dialog: MatDialog,
    private prodcutService: ProductService,
    private _snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {
    this.load();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || this.dataSource.paginator;
    this.dataSource.sort = this.sort || this.dataSource.sort;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  load(){
    this.prodcutService.getAll().subscribe((data: Product[]) => {
      this.dataSource = new MatTableDataSource<Product>(data);
      this.loading = false;
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', {
      duration: 3000
    });
  }

  create() {
    const dialog = this.dialog.open(ProductFormComponent, { maxWidth: "650px" });
    dialog.afterClosed().subscribe((result) => {
      if (result){
        this.loading = true;
        this.load();
      }
    });
  }

  edit(product: Product) {
    const dialog = this.dialog.open(ProductFormComponent, { 
      maxWidth: "650px",
      data: product
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
        this.delete(product.id);
    });
  }

  delete(id: number) {
    this.prodcutService.delete(id).subscribe(()=>{
      this.loading = true;
      this.openSnackBar("Produto deletado com sucesso!");
      this.load();
    });
  }

}


