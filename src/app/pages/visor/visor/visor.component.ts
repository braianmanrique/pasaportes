import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VisorWebsocketService } from '../../../services/visor-websocket/visor-websocket.service';
import { CitasService } from '../../../services/citas/citas.service';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrl: './visor.component.scss',
})
export class VisorComponent implements OnInit {
  nombreLlamado: string = '';
  puestoAsignado: any;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['nombre', 'cedula', 'puesto'];
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: SpeechSynthesisVoice | null = null;
  citasPrioritarias: any[] = [];
  citasEnEspera: any[] = [];
  estaHablando: boolean = false;
  indexLlamado: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private wsService: VisorWebsocketService,
    private visorService: CitasService
  ) {}

  ngOnInit(): void {
    document.addEventListener('click', () => this.desbloquearAudio(), {
      once: true,
    });
    this.obtenerVoces();
    speechSynthesis.onvoiceschanged = () => this.obtenerVoces();

    this.iniciarWebSocket();
  }

  iniciarWebSocket(): void {
    console.log('🔄 Conectando al WebSocket...');
    this.wsService.connect(
      'wss://backend-auth-log-project.onrender.com/ws/citas/'
    );

    this.wsService.getMessages().subscribe({
      next: (data: any) => this.procesarMensajeWebSocket(data),
      error: (err) => {
        console.error(' WebSocket error:', err);
        this.reconectarWebSocket();
      },
      complete: () => {
        console.warn(' Conexión WebSocket cerrada.');
        this.reconectarWebSocket();
      },
    });
  }

  reconectarWebSocket(): void {
    setTimeout(() => {
      this.iniciarWebSocket();
      this.recuperarCitasEnEspera();
    }, 4000);
  }

  desbloquearAudio(): void {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        console.log('🎵 Audio desbloqueado');
      });
    }

    const buffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);

    document.removeEventListener('click', this.desbloquearAudio);
  }

  procesarMensajeWebSocket(data: any): void {
    if (window.location.pathname !== '/dashboard/visor') return;
    console.log(data, 'ingreso');

    if (data.id_cita && data.nuevo_estado === 'E') {
      return;
    }

    if (data.id_cita && data.nuevo_estado === 'L') {
      const citaExistente = this.citasEnEspera.find(
        (c) => c.id === data.id_cita
      );
      console.log('entor cita L', data);
      if (!citaExistente) {
        this.citasEnEspera.push({
          id: data.id_cita,
          nombre_citizen: data.nombre_citizen,
          puesto: `Módulo ${data.numero_modulo}`,
          llamados: 0,
        });
      }

      this.actualizarTabla();

      if (!this.estaHablando) {
        this.llamarSiguiente();
      }
    } else if (
      data.id_cita &&
      (data.nuevo_estado === 'N' || data.nuevo_estado === 'D')
    ) {
      const index = this.citasEnEspera.findIndex((c) => c.id === data.id_cita);
      if (index !== -1) {
        this.citasEnEspera.splice(index, 1);
        this.actualizarTabla();
      }
    }

    this.dataSource.data = [...this.citasEnEspera];
    this.cdr.detectChanges();
  }

  llamarSiguiente(): void {
    if (this.estaHablando || this.citasEnEspera.length === 0) return;

    this.estaHablando = true;

    let cita: any;
    let intentos = 0;
    const maxIntentos = this.citasEnEspera.length;

    while (intentos < maxIntentos) {
      cita = this.citasEnEspera[this.indexLlamado];

      if (!cita) {
        this.estaHablando = false;
        return;
      }

      if (cita.llamados < 2) break;
      else {
        this.indexLlamado = (this.indexLlamado + 1) % this.citasEnEspera.length;
        intentos++;
      }
    }

    if (cita.llamados >= 2) {
      this.estaHablando = false;
      return;
    }

    this.reproducirSonidoArpa(() => {
      this.nombreLlamado = cita.nombre_citizen;
      this.puestoAsignado = cita.puesto;
      this.cdr.detectChanges();

      this.llamarPorVoz(() => {
        this.estaHablando = false;

        setTimeout(() => {
          this.nombreLlamado = '';
          this.puestoAsignado = '';
          this.cdr.detectChanges();
        }, 2000);

        cita.llamados++;

        setTimeout(() => {
          if (this.citasEnEspera.length > 0) {
            this.indexLlamado =
              (this.indexLlamado + 1) % this.citasEnEspera.length;
            this.llamarSiguiente();
          } else {
            this.indexLlamado = 0;
            this.estaHablando = false;
          }
        }, 3000);
      });
    });

    this.cdr.detectChanges();
  }

  reproducirSonidoArpa(callback?: () => void): void {
    const arpaAudio = new Audio('assets/sounds/arpa.mp3');

    arpaAudio
      .play()
      .then(() => console.log('🎶 Sonido de arpa reproducido correctamente.'))
      .catch((err) =>
        console.error('❌ Error al reproducir el sonido de arpa:', err)
      );

    arpaAudio.onended = () => {
      this.estaHablando = false;
      if (callback) callback();
    };
  }

  actualizarTabla(): void {
    this.dataSource.data = [...this.citasEnEspera];
    this.cdr.detectChanges();
  }

  llamarPorVoz(callback?: () => void): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Atención, ${this.nombreLlamado}, por favor dirigirse a ${this.puestoAsignado}.`
      );

      utterance.lang = 'es-CO';
      utterance.rate = 0.9;

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      utterance.onend = () => {
        this.estaHablando = false;
        if (callback) callback();
      };

      utterance.onerror = (error) => {
        console.error('❌ Error en la síntesis de voz:', error);
        this.estaHablando = false;
        if (callback) callback();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta la funcionalidad de lectura en voz.');
      if (callback) callback();
    }
  }

  obtenerVoces(): void {
    const obtenerListaVoces = () => {
      const todasLasVoces = speechSynthesis.getVoices();

      this.voices = todasLasVoces.filter((voice) => voice.lang === 'es-CO');

      if (this.voices.length === 0) {
        this.voices = todasLasVoces.filter((voice) =>
          voice.lang.startsWith('es')
        );
      }

      if (this.voices.length > 0) {
        this.selectedVoice = this.voices[0];
      }
      this.cdr.detectChanges();
    };

    obtenerListaVoces();

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = obtenerListaVoces;
    }
  }

  recuperarCitasPrioritarias(): void {
    this.visorService.listarPrioritariasCitasVisor().subscribe(
      (response: any) => {
        if (response?.citas && Array.isArray(response.citas)) {
          this.citasPrioritarias = response.citas.map((cita: any) => ({
            id: cita.id_cita,
            nombre_citizen: cita.nombre_citizen,
            puesto: `Módulo ${cita.numero_modulo}`,
            llamados: 0,
            prioridad: true,
          }));

          this.actualizarListaCitas();
        } else {
          console.warn(
            '⚠️ Respuesta inesperada en citas prioritarias',
            response
          );
        }
      },
      (error) => {
        console.error('❌ Error al recuperar citas prioritarias:', error);
      }
    );
  }

  recuperarCitasEnEspera(): void {
    this.visorService.listarCitasVisor().subscribe(
      (response: any) => {
        if (response?.citas && Array.isArray(response.citas)) {
          this.citasEnEspera = response.citas.map((cita: any) => ({
            id: cita.id_cita,
            nombre_citizen: cita.nombre_citizen,
            puesto: `Módulo ${cita.numero_modulo}`,
            llamados: 0,
            prioridad: false,
          }));

          this.actualizarListaCitas();
        } else {
          console.warn('⚠️ Estructura inesperada en las citas', response);
        }
      },
      (error) => {
        console.error('❌ Error al recuperar citas en espera:', error);
      }
    );
  }

  actualizarListaCitas(): void {
    this.citasEnEspera = [...this.citasPrioritarias, ...this.citasEnEspera];

    this.actualizarTabla();

    if (!this.estaHablando && this.citasEnEspera.length > 0) {
      this.llamarSiguiente();
    }
  }
}
