import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../characters.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Character } from '../character';
import { range } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.sass']
})
export class CharactersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'image']
  data: Character[] = []
  dataSource = new MatTableDataSource<Character>(this.data)
  pokemons = []

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharacters()
  }

 getCharacters(){
   let character;
   range(1, 150).subscribe( id => 
   this.characterService.getCharacters(id).subscribe(
    (res) => {
      character = {
         id: id,
         name: res.name,
         image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
       };
       this.data.push(character)
       this.dataSource = new MatTableDataSource<Character>(this.data)
       this.dataSource.paginator = this.paginator
    })
 )}

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
