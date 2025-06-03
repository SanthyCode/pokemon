import { Component, EventEmitter, Output } from '@angular/core';
import { Pokemon } from '../../../assets/services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-pokemon.component.html',
  styleUrl: './create-pokemon.component.scss'
})
export class CreatePokemonComponent {
 @Output() onClose = new EventEmitter<void>();
  @Output() onCreate = new EventEmitter<Pokemon>();

  newPokemon: Pokemon = {
    id: uuidv4(),
    name: '',
    height: 0,
    weight: 0,
    types: [],
    sprites: '',
    active: true,
  };

  typesString = '';

  submitForm() {
    this.newPokemon.types = this.typesString
      .split(',')
      .map(type => type.trim())
      .filter(type => type.length > 0);

    this.onCreate.emit(this.newPokemon);
    this.onClose.emit();
  }

  closeModal() {
    this.onClose.emit();
  }
}
