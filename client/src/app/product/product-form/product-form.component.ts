import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from '../category/category-form/category-form.component';
import { Category } from 'src/app/models/product/category.model';
import { ValidatorsForm } from 'src/app/helpers/validators-form';
import { ErrorMessageService } from 'src/app/shared/service/error-message.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  options: Category[] = [{ name: 'fruta', id: 1, active: true }, { name: 'verdura', id: 2, active: true }, { name: 'refrigerante', id: 3, active: true }];
  filteredOptions?: Observable<Category[]>;
  isNew = true;

  constructor(
    public dialog: MatDialog,
    public errorMessage: ErrorMessageService
  ) {
    this.productForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      value: new FormControl("", [Validators.required, ValidatorsForm.isMoney()]),
      category: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.filteredOptions = this._filterInit();
  }

  onlyNumber() {
    const control = this.productForm.controls['value'];
    control.setValue(
      control.value.replace(/\D/g,
        function (match : string) {
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

  openDialogCategory() {
    const dialog = this.dialog.open(CategoryFormComponent, { width: 'auto' });
    dialog.afterClosed().subscribe((result) => {
      alert(result)
    });
  }

}

