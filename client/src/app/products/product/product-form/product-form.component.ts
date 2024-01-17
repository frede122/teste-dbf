import { Product } from './../../../models/products/product.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryFormComponent } from '../../category/category-form/category-form.component';
import { Category } from 'src/app/models/products/category.model';
import { ValidatorsForm } from 'src/app/helpers/validators-form';
import { ErrorMessageService } from 'src/app/shared/service/error-message.service';
import { CategoryService } from 'src/app/services/products/category.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  options: Category[] = [];
  filteredOptions?: Observable<Category[]>;
  isNew: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    public dialog: MatDialog,
    public errorMessage: ErrorMessageService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      value: new FormControl("", [Validators.required, ValidatorsForm.isMoney()]),
      category: new FormControl("", [Validators.required])
    });
    
  }
  
  
  ngOnInit() {
    this.loadCategory();
    if (this.data) {
      this.productForm.patchValue(this.data)
      this.isNew = false;
    }

  }

  loadCategory(){
    this.categoryService.getAll().subscribe((data: Category[]) =>{
      this.options = data;
      this.filteredOptions = this._filterInit();
    })
  }

  onlyNumber() {
    const control = this.productForm.controls['value'];
    control.setValue(
      control.value.replace(/\D/g,
        function (match: string) {
          return match === "," ? match : "";
        })
    );
  }

  private _filterInit(): Observable<Category[]> {
    return this.productForm.controls['category'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  private _filter(name: string): Category[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  openCategoryForm() {
    const dialog = this.dialog.open(CategoryFormComponent, { width: 'auto' });
    dialog.afterClosed().subscribe((result) => {
      this.loadCategory();
    });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', {
      duration: 3000
    });
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.productForm.valid) {
      let data: Product = this.isNew ? new Product("","",new Category(""),0) : this.data;
      data.name = this.productForm.value.name;
      data.description = this.productForm.value.description;
      data.value = this.productForm.value.value;
      data.category = this.productForm.value.category;
      this.isNew ? this.create(data) : this.update(data.id, data);
    } else {
      this.openSnackBar("campos invalidos!")
    }
  }

  create(product: Product){
    console.log(product)
    this.productService.create(product).subscribe((data)=>{
      this.openSnackBar("salvo com sucesso!");
      this.dialogRef.close(data);
    })
  }
  update(id: number, product: Product){
    this.productService.update(id, product).subscribe((data)=>{
      this.openSnackBar("salvo com sucesso!");
      this.dialogRef.close(data);
    })
  }

}

