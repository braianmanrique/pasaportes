import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisorWebsocketService {
  private socket!: WebSocket;
  private messagesSubject = new Subject<any>();
  private isConnected = false;
  private lastPingTime: number = Date.now();
  private url: string = '';
  private reconnectInterval: number = 2000; // 🔄 Intentar reconectar en 2s
  private maxReconnectAttempts: number = 10;
  private reconnectAttempts: number = 0;

  constructor() {}

  connect(url: string): void {
    if (this.isConnected) return;
    this.isConnected = true;
    this.url = url;

    console.log('🔍 Intentando conectar al WebSocket en:', url);
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('🔗 Conectado al WebSocket');
      this.lastPingTime = Date.now();
      this.reconnectAttempts = 0; // 🔄 Resetear contador de intentos de reconexión
    };

    this.socket.onmessage = (event) => {
      console.log('📩 Mensaje recibido:', event.data);
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'ping') {
          console.log('🔄 Ping recibido. Enviando pong...');
          this.lastPingTime = Date.now();
          this.sendMessage({ type: 'pong' });
          return;
        }

        this.messagesSubject.next(data);
      } catch (error) {
        console.error('❌ Error al parsear mensaje:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.warn('⚠️ WebSocket cerrado. Intentando reconectar...');
      this.isConnected = false;

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.reconectarWebSocket(), this.reconnectInterval);
      } else {
        console.error('❌ Máximo de intentos de reconexión alcanzado.');
      }
    };

    // 🔹 Verificamos cada 15s si el WebSocket sigue activo
    setInterval(() => this.verificarConexion(), 15000);
  }

  sendMessage(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('📤 Enviando mensaje:', message);
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('⚠️ No se pudo enviar el mensaje, WebSocket no conectado');
    }
  }

  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  private verificarConexion(): void {
    const tiempoDesdeUltimoPing = Date.now() - this.lastPingTime;

    if (tiempoDesdeUltimoPing > 45000) {
      // Si pasan más de 45s sin ping
      console.warn(
        '⚠️ No se han recibido pings en 45s. Reintentando conexión...'
      );
      this.reconectarWebSocket();
    }
  }

  private reconectarWebSocket(): void {
    console.warn(
      `🔄 Reintentando conexión WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
    );

    if (this.socket) {
      this.socket.close(); // 🔹 Cerramos la conexión vieja si aún está activa
    }

    this.isConnected = false;
    setTimeout(() => {
      this.connect(this.url);
    }, this.reconnectInterval);
  }
}
