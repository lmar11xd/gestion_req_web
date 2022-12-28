import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

import { Response } from '../interfaces/response';
import { Requerimiento } from '../interfaces/requerimiento';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoService {

  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint + "/requerimiento";

  constructor(private http:HttpClient) { }

  getList(): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}`);
  }

  getById(id:number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(data:FormData): Observable<Response> {
    const url = this.endPoint + "/requerimiento2";
    return this.http.post<Response>(url, data);
    //return this.http.post<Response>(this.apiUrl, data);
  }

  update(id:number, data:Requerimiento): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, data);
  }

  delete(id:number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/${id}`);
  }

  addFile(data:FormData): Observable<Response> {
    const url = this.endPoint + "/uploadFile";
    return this.http.post<Response>(url, data);
  }
}
