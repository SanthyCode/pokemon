import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pokemon {
  id?: string | number;
  active?: boolean;
  name: string;
  height?: number;
  weight?: number;
  types?: string[] | string;
  sprites?: string;
}

export interface Data {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getAllCustomPokemons(): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.baseUrl}/pokemons/`);
  }

  createPokemon(pokemon: Pokemon): Observable<any> {
    return this.http.post(`${this.baseUrl}/pokemons/`, pokemon);
  }

  updatePokemon(id: string, pokemon: Pokemon): Observable<any> {
    return this.http.put(`${this.baseUrl}/pokemons/${id}`, pokemon);
  }

  deletePokemon(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pokemons/delete/${id}`);
  }

}