import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Data, Pokemon, PokemonService } from '../../../assets/services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EditComponentComponent } from '../edit-component/edit-component.component';
import { lastValueFrom } from 'rxjs';
import { CreatePokemonComponent } from '../create-pokemon/create-pokemon.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.component.html',
  imports: [CommonModule, EditComponentComponent, CreatePokemonComponent],
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  showModal = false;
  showCreateModal = false;

  constructor(
    private pokemonService: PokemonService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    await this.loadPokemons();
  }

  async createPokemon(pokemon: Pokemon) {
    await this.pokemonService.createPokemon(pokemon).subscribe(() => {
      this.showCreateModal = false;
      this.loadPokemons();
    });
  }

  async loadPokemons() {
    try {
      const response = await lastValueFrom(this.pokemonService.getAllCustomPokemons());

      this.pokemons = response.map((res: any) => res.p)
        .filter((pokemon: any) => pokemon.active)
        .sort();

      if (isPlatformBrowser(this.platformId)) {
        await this.preloadImages();
      }

    } catch (error) {
      console.error('Error loading pokemons:', error);
    }
  }

  private preloadImages(): Promise<void[]> {
    const imagePromises = this.pokemons.map(pokemon => {
      return new Promise<void>((resolve, reject) => {
        if (!pokemon.sprites) {
          resolve();
          return;
        }

        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn(`Failed to load image for ${pokemon.name}`);
          resolve();
        };
        img.src = pokemon.sprites;
      });
    });

    return Promise.all(imagePromises);
  }

  deletePokemon(value: any) {
    if (confirm('¿Estás seguro que deseas eliminar este dato?')) {
      this.pokemonService.deletePokemon(value.id).subscribe({
        next: () => {
          alert('Pokémon eliminado');
          this.loadPokemons();
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  openEdit(pokemon: Pokemon) {
    this.selectedPokemon = { ...pokemon };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPokemon = null;
  }

  async savePokemon(pokemon: Pokemon) {
    if (!pokemon.id) {
      throw new Error('Pokémon ID is required');
    }

    const pokemonId = pokemon.id.toString();
    await lastValueFrom(this.pokemonService.updatePokemon(pokemonId, pokemon));
    this.closeModal();
    this.loadPokemons();
  }
}
