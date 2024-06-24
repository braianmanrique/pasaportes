import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormalizadoresService {

  constructor(private _http:HttpClient) { }

  addFormalizador(data:any):Observable<any>{
    return this._http.post('', data);
  }
}
