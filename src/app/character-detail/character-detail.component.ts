import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../character';
import { CharacterService } from '../characters.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.sass'],
})
export class CharacterDetailComponent implements OnInit {
  pokemon: Character | any;
  pokemonImg = '';

  constructor(
    private characterService: CharacterService,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe((params) => {
      this.getCharacter(params['id']);
    });
  }

  ngOnInit(): void {}

  getCharacter(id: number) {
    this.characterService.getCharacters(id).subscribe((res) => {
      this.pokemon = res;
      this.pokemon.name = res.name;
      this.pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      this.pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
      this.pokemon.base_experience = res.base_experience;
      this.pokemon.height = res.height;
      this.pokemon.weight = res.weight;
    });
  }
}
