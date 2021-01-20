import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable, of } from 'rxjs';

import { Profile } from '../interfaces';

@Injectable()
export class ProfileService {
  private pokemonApi: string;
  constructor(private _http: HttpClient) {
    this.pokemonApi = 'https://pokeapi.co/api/v2/pokemon/';
  }

  getUser(): Observable<Profile> {
    const user = Cookie.get('access_token');
    const pokemon = user === 'user1' ? 'dragonite' : 'suicune';
    const response = { name: pokemon, url: `${this.pokemonApi}${pokemon}` };
    return of(response);
  }
}
