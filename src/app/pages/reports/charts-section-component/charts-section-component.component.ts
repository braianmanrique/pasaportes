import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-charts-section-component',
  templateUrl: './charts-section-component.component.html',
  styleUrl: './charts-section-component.component.scss'
})
export class ChartsSectionComponentComponent {
  @Input() title: string = ''; // Título de la sección
  @Input() data: any[] = []; // Datos para los gráficos
  @Input() colorScheme: any = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] }; // Esquema de colores
}
