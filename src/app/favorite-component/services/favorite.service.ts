import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class FavoriteService {
  private pokemonApi: string;
  constructor(private _http: HttpClient) {}

  getFavorites(): Observable<string> {
    const favorite = window.sessionStorage.getItem('favorite-pokemons');
    return of(favorite);
  }
}
