import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false); // Cambiado a BehaviorSubject para emitir siempre el último valor
  public readonly loading$ = this._loading.asObservable();


  constructor() { }
  show(): void {
    this._loading.next(true); // Cambia el estado a true
  }

  hide(): void {
    console.log('LoadingService: hide() called'); // Log para confirmar
    this._loading.next(false); // Cambia el estado a false
  }
}
