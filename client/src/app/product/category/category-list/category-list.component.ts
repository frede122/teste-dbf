import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Category } from 'src/app/models/product/category.model';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Category>;


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

  openCategoryForm() {
    const dialog = this.dialog.open(CategoryFormComponent, { width: 'auto' });
    dialog.afterClosed().subscribe((result) => {
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
        this.delete(category);
    });
  }

  delete(category: Category){
    let data = this.dataSource.data;
    data.splice(data.indexOf(category), 1);
    this.dataSource.data = data;
  }

}


const DATA: Category[] = [
  { id: 1, name: "fruta" },
  { id: 2, name: "verdura" },
  { id: 3, name: "leguminosaleguminosaleguminosalegosaleguminosa" },
  { id: 4, name: "benificiados" },
  { id: 5, name: "enlatados" },
  { id: 6, name: "doces" }
];