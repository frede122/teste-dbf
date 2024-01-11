import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/product/category.model';
import { ErrorMessageService } from 'src/app/shared/service/error-message.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup;
  isNew: boolean = true;

  constructor(
    public errorMessage: ErrorMessageService,
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.categoryForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data) {
      this.categoryForm.patchValue(this.data)
      this.isNew = false;
    }
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
    if (this.categoryForm.valid) {
      let product: Category = {
        id: 1,
        name: this.categoryForm.value.name
      }
      this.dialogRef.close(product);
    } else {
      this.openSnackBar("campos invalidos!")
    }
  }
}
