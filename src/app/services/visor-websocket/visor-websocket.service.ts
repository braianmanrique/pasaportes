import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class VisorWebsocketService {
  private socket!: WebSocket;
  private messagesSubject = new Subject<any>();
  constructor() { }

  connect(url: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log('🔗 Conectado al WebSocket');
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('📩 Mensaje recibido:', data);
        this.messagesSubject.next(data);
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

  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }
}
