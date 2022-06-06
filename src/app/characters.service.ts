import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Character } from './character';

@Injectable({
    providedIn:'root'
})

export class CharacterService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient){ }


    getCharacters(id:number){
        return this.http.get<Character>(`${this.baseUrl}/pokemon/${id}`)
        
    }
}
