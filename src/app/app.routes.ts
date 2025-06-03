import { Routes } from '@angular/router';
import path from 'path';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

export const routes: Routes = [
    { path: '', component: PokemonListComponent },
];
