import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../api/user';

const path: string = './assets/data/';
const FAVORITES = 'FAVORITES';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getUsers(): Observable<any> {
    return this.http.get<User[]>(`${path}/data.json`);
  }

  public setFavorites(users: User[]): void {
    window.localStorage.setItem(FAVORITES, JSON.stringify(users));
  }

  public getFavorites(): User[] {
    return JSON.parse(window.localStorage.getItem('FAVORITES')) || [];
  }

  public redirectToPage(page: string): void {
    this.router.navigate([page]);
  }
}
