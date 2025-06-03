import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../assets/services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-component.component.html',
  styleUrl: './edit-component.component.scss'
})
export class EditComponentComponent {
  @Input() pokemonData!: Pokemon;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<Pokemon>();

  submitForm() {
  if (typeof this.pokemonData.types === 'string') {
    this.pokemonData.types = this.pokemonData.types
      .split(',')
      .map((type: any) => type.trim());
  }

  this.onSubmit.emit(this.pokemonData);
  this.onClose.emit();
}

  closeModal() {
    this.onClose.emit();
  }
}
