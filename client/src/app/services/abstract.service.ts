import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<type> {
  public url = environment.apiUrl;
  public route = "";

  constructor(public http: HttpClient) {
  }

  public create(parament: type): Observable<type>{
    return this.http.post<type>(`${this.url}/${this.route}`, parament);
  }

  public getById(id: string): Observable<type>{
    return this.http.get<type>(`${this.url}/${this.route}/${id}`)
  }


  public getAll(): Observable<type[]>{
    return this.http.get<type[]>(`${this.url}/${this.route}`);
  }

  public update(id:number, parament: type): Observable<type>{
    return this.http.put<type>(`${this.url}/${this.route}/${id}`, parament)
  }

  public delete(id:number){
    return this.http.delete<type>(`${this.url}/${this.route}/${id}`)
  }
}
