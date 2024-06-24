import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-add-edit',
  templateUrl: './form-add-edit.component.html',
  styleUrl: './form-add-edit.component.scss'
})
export class FormAddEditComponent {
  formalizadorForm: FormGroup = this._fb.group({
    nombre:''
  });

  constructor(private _fb : FormBuilder, private _dialogRef: DialogRef<FormAddEditComponent>){
    // this._dialogRef.close()

  }



}
