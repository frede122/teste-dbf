import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Category } from 'src/app/models/products/category.model';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CategoryService } from 'src/app/services/products/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
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
      this.dataSource = new MatTableDataSource<Category>(data)
    })
  }

  create() {
    const dialog = this.dialog.open(CategoryFormComponent, { maxWidth: "450px" });
    dialog.afterClosed().subscribe((result) => {
      if (result)
        this.load()
    });
  }

  edit(category: Category) {
    const dialog = this.dialog.open(CategoryFormComponent, { 
      maxWidth: "650px",
      data: category
    });
  }

  // create() {
  //   const dialog = this.dialog.open(CategoryFormComponent, { maxWidth: "450px" });
  //   dialog.afterClosed().subscribe((result: Category) => {
  //     if (result) {
  //       this.categoryService.create(result).subscribe(()=>{
  //         this.load();
  //       });
  //     }
  //   });
  // }

  // edit(category: Category) {
  //   const dialog = this.dialog.open(CategoryFormComponent, {
  //     maxWidth: "650px",
  //     data: category
  //   });

  //   dialog.afterClosed().subscribe((result: Category) => {
  //     if (result) {
  //       this.categoryService.update(result.id, result).subscribe(()=>{
  //         this.load();
  //       });
  //     }
  //   });
  // }

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
      this.load();
    });
  }

}