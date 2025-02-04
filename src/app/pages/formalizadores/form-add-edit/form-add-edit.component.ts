import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormalizadoresService } from '../../../services/formalizadores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-add-edit',
  templateUrl: './form-add-edit.component.html',
  styleUrl: './form-add-edit.component.scss'
})
export class FormAddEditComponent {
  formalizadorForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormAddEditComponent>,
    private formalizadoresService: FormalizadoresService,
    private snackBar: MatSnackBar
  ) {
    this.formalizadorForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['atencion_pasaporte', [Validators.required]] 
    });
  }

  onSubmit(): void {
    if (this.formalizadorForm.valid) {
      const formData = this.formalizadorForm.value;

      this.formalizadoresService.registerFormalizador(formData).subscribe({
        next: () => {
          this.snackBar.open('Formalizador registrado con éxito.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.dialogRef.close(true); 
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar formalizador.');
        }
      });
    } else {
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }

}
