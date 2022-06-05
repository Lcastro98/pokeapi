import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

@Injectable({
    providedIn:'root'
})

export class CharacterService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient){ }


    getCharacters(id:number){
        return this.http.get<any>(`${this.baseUrl}/pokemon/${id}`)
    }
}
