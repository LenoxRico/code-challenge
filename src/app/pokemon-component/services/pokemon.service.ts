import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Pokemon } from '../interfaces';

@Injectable()
export class PokemonService {
  private pokemonApi: string;
  constructor(private _http: HttpClient) {
    this.pokemonApi = 'https://pokeapi.co/api/v2/pokemon?';
  }

  getPokemons(filter = '', limit = 10, offset = 0): Observable<Pokemon[]> {
    const search = filter ? `&${filter}` : '';
    return this._http.get<Pokemon[]>(
      `${this.pokemonApi}limit=${limit}&offset=${offset}${search}`
    );
  }

  getPokemonDetail(pokemonUrl: string): Observable<Pokemon> {
    return pokemonUrl
      ? this._http.get<Pokemon>(`${pokemonUrl}`)
      : throwError('error-url');
  }

  getPokemonLocation(locationUrl: string): Observable<Pokemon> {
    return locationUrl
      ? this._http.get<Pokemon>(`${locationUrl}`)
      : throwError('error-url');
  }
}
