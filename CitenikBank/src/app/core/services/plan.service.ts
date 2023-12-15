import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanClass } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  url: string = 'https://localhost:7106/api/planes';
  planSeleccionado: any;

  constructor(private http: HttpClient) { }
  listarPlanes(): Observable<any> {
    return this.http.get(this.url);
  }
}
