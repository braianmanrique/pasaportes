import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrl: './visor.component.scss'
})
export class VisorComponent implements OnInit {
  nombreLlamado: string = 'Nadie';
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['nombre', 'cedula', 'puesto'];
  voices: SpeechSynthesisVoice[] = []; // Lista de voces disponibles
  selectedVoice: SpeechSynthesisVoice | null = null; // Voz seleccionada

  ngOnInit(): void {
    this.cargarPersonasAtendidas();
    this.obtenerVoces();
    speechSynthesis.onvoiceschanged = () => this.obtenerVoces();
  }

  constructor(private cdr: ChangeDetectorRef) {}
  cargarPersonasAtendidas(): void {
    const datosPrueba = [
      { nombre: 'Juan Pérez', cedula: 12345678, puesto: 'Puesto 1' },
      { nombre: 'Sofía Ramírez', cedula: 87654321, puesto: 'Puesto 2' },
      { nombre: 'Andrés Gómez', cedula: 11223344, puesto: 'Puesto 3' },
    ];
    this.dataSource.data = datosPrueba;
  }

  obtenerVoces(): void {
    const obtenerListaVoces = () => {
      this.voices = speechSynthesis.getVoices();
      console.log('Voces disponibles:', this.voices);
  
      // Filtra las voces en español, priorizando Latinoamérica y Colombia
      this.voices = this.voices.filter(voice =>
        voice.lang.startsWith('es') && (voice.lang.includes('MX') || voice.lang.includes('US') || voice.lang.includes('CO') || voice.lang.includes('Latam'))
      );
  
      // Selecciona la primera voz disponible
      if (this.voices.length > 0) {
        this.selectedVoice = this.voices[0];
      }
      this.cdr.detectChanges();
    };
  
    // Intenta obtener las voces inmediatamente
    obtenerListaVoces();
  
    // Si las voces aún no están disponibles, espera a que se carguen
    if (this.voices.length === 0) {
      speechSynthesis.onvoiceschanged = obtenerListaVoces;
    }
  }
  

  seleccionarPersona(persona: any): void {
    this.nombreLlamado = persona.nombre;
    this.llamarPorVoz();
  }

  llamarPorVoz(): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Atención, ${this.nombreLlamado}, por favor dirigirse al puesto asignado.`);
  
      utterance.lang = 'es-CO'; // Intenta forzar español colombiano
      
      // Si no hay una voz específica de Colombia, usa otra voz latina
      if (!this.selectedVoice) {
        const vocesLatinas = this.voices.filter(voice => voice.lang.includes('es') && (voice.lang.includes('MX') || voice.lang.includes('US')));
        if (vocesLatinas.length > 0) {
          this.selectedVoice = vocesLatinas[0];
        }
      }
  
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }
  
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta la funcionalidad de lectura en voz.');
    }
  }
  
}
