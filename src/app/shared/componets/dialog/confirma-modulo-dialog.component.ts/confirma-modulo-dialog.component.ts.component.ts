import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirma-modulo-dialog.component.ts',
  templateUrl: './confirma-modulo-dialog.component.ts.component.html',
  styleUrl: './confirma-modulo-dialog.component.ts.component.scss'
})
export class ConfirmaModuloDialogComponentTsComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmaModuloDialogComponentTsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Devuelve false al cerrar
  }

  onConfirm() {
    this.dialogRef.close(true); // Devuelve true al cerrar
  }
}
