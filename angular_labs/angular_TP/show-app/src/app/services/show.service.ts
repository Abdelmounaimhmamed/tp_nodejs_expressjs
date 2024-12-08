// src/app/services/show.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private apiUrl = 'http://localhost:3000/shows';

  constructor(private http: HttpClient) { }

  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(this.apiUrl);
  }

  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrl}/${id}`);
  }

  createShow(show: Show): Observable<Show> {
    return this.http.post<Show>(this.apiUrl, show);
  }

  updateShow(show: Show): Observable<Show> {
    return this.http.put<Show>(`${this.apiUrl}/${show.id}`, show);
  }

  deleteShow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
