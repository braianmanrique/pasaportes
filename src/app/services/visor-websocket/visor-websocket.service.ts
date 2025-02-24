import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class VisorWebsocketService {
  private socket!: WebSocket;
  private messagesSubject = new Subject<any>();
  private isConnected = false;
  constructor() { }

  connect(url: string): void {
    if (this.isConnected) return; // 📌 No conectar si ya está conectado
    this.isConnected = true;
    
    console.log('🔍 Intentando conectar al WebSocket en:', url);
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.log('📡 Creando nueva conexión WebSocket...');
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log('🔗 Conectado al WebSocket en:', url);
      };

      this.socket.onmessage = (event) => {
        console.log('📩 Mensaje recibido:', event.data);
        try {
          const data = JSON.parse(event.data);
          this.messagesSubject.next(data);
        } catch (error) {
          console.error('❌ Error al parsear mensaje:', error);
        }
      };
      this.socket.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };

      this.socket.onclose = () => {
        console.warn('⚠️ WebSocket cerrado, intentando reconectar...');
        setTimeout(() => this.connect(url), 5000); // Reintento en 5 segundos
      };
    }
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
}
