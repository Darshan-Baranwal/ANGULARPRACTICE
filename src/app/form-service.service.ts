import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IFormStructureInterface } from './IFormStructureInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService  {


  constructor(private http: HttpClient) { 

  }
  public getFormStructure(): Observable<IFormStructureInterface[]> {
    return this.http.get<IFormStructureInterface[]>("./assets/ServerResponse.json");
  }

}
