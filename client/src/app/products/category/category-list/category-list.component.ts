import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Category } from 'src/app/models/products/category.model';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CategoryService } from 'src/app/services/products/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Category>;
  loading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource<Category>();
  }

  ngOnInit(): void {
    this.load();
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

  load() {
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.dataSource = new MatTableDataSource<Category>(data);
      this.loading = false;
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', {
      duration: 3000
    });
  }

  create() {
    const dialog = this.dialog.open(CategoryFormComponent, { maxWidth: "450px" });
    dialog.afterClosed().subscribe((result) => {
      if (result){
        this.loading = true;
        this.load();
      }
    });
  }

  edit(category: Category) {
    const dialog = this.dialog.open(CategoryFormComponent, { 
      maxWidth: "650px",
      data: category
    });
  }

  openConfirmDelete(category: Category) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      minWidth: "375px",
      data: {
        title: `Categoria: ${category.name}`,
        message: `Gostaria de excluir a categoria: ${category.name}?`
      }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result)
        this.delete(category.id);
    });
  }

  delete(id: number) {
    this.categoryService.delete(id).subscribe(()=>{
      this.loading = true;
      this.openSnackBar("Categoria deletada com sucesso!");
      this.load();
    });
  }

}