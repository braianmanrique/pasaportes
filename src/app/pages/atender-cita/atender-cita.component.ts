import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from '../../services/citas/citas.service';

@Component({
  selector: 'app-atender-cita',
  templateUrl: './atender-cita.component.html',
  styleUrl: './atender-cita.component.scss'
})
export class AtenderCitaComponent {
  cita: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citasService: CitasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // Obtener los detalles de la cita por ID
    // this.citasService.obtenerCitaPorId(id).subscribe({
    //   next: (data) => {
    //     this.cita = data;
    //   },
    //   error: (err) => {
    //     console.error('Error al obtener los detalles de la cita:', err);
    //   }
    // });
  }

  finalizarCita(): void {
    this.citasService.actualizarEstadoCita(this.cita.id_cita, 'Finalizada').subscribe({
      next: () => {
        alert('Cita finalizada correctamente.');
        this.router.navigate(['/']); // Redirigir a la página principal
      },
      error: (err) => {
        console.error('Error al finalizar la cita:', err);
      }
    });
  }
}
