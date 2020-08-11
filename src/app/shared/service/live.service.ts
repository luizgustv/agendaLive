import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePageable } from '../model/responsePageable.model';
import { Live } from '../model/live.model';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  apiUrl = 'http://localhost:8080/lives';

  //opçoes para requisição do tipo POST/PUT
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json' 
    })
  };

  constructor(private httpClient: HttpClient) 
  { }

  public getLivesWithFlag(flag: string): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag);
  }

  // () : esse metodo ira retornar um observable
  public postLives(live: any): Observable<Live>{
    return this.httpClient.post<any>(this.apiUrl, live, this.httpOptions);
  }

}
