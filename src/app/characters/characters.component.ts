import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../characters.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Character } from '../character';

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
   for(let i = 1; i <= 150; i++){
   this.characterService.getCharacters(i).subscribe(
     res => {
      character = {
         id: i,
         name: res.name,
         image: res.sprites.front_default
       };
       this.data.push(character)
       this.dataSource = new MatTableDataSource<Character>(this.data)
       this.dataSource.paginator = this.paginator
     },
     err => {
      console.log(err)
     }
   )}
 }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
