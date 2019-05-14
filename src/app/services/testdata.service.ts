import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestdataService {
  public genders: Array<string> = ['Male', 'Female'];
  public regions: Array<string> = ['Canada', 'Romania', 'Sweden'];
  
  constructor(private http: HttpClient) { }

  public getGenders():Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) =>{
      resolve(this.genders);
    });
  }

  public getRegions():Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) =>{
      resolve(this.regions);
    });
  }

}
