import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Profile, ProfileExt } from '../models/index';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profile: Promise< Profile >;
  public profileExt: Promise< ProfileExt >;
  public profiles: Promise< Array<Profile> >;
  public profileExts: Promise< Array<ProfileExt> >;

  constructor(private http: HttpClient) { }

  public getProfile(): void {
    this.profile = this.http.get<Profile>(environment.REST_API_URL)
      .toPromise();
      console.log(this.profile);
  }

  public getProfileExt(): void {
    this.profileExt = this.http.get<ProfileExt>(environment.REST_API_URL + '?ext')
      .toPromise();
    console.log(this.profileExt);
  }

  public getProfileList(amount?: number, gender?: string, region?: string): Promise<Array<ProfileExt>> {
    const paramaters: string = ('&amount=' + amount
      + (gender != null ? '&gender=' + gender : '')
      + (region != null ? '&region=' + region : '')).toLowerCase();

    this.profileExts = this.http.get<Array<ProfileExt>>(environment.REST_API_URL + '?ext' + paramaters)
      .toPromise();

    return this.profileExts;
  }

  public getProfileExtListTestData(gender?: string, region?: string): Promise<Array<ProfileExt>> {
    this.profileExts = new Promise<Array<ProfileExt>>((resolve, reject) => {
      setTimeout(() => {
        this.getJSON(gender, region).then(result => {
          resolve(result);
        });
      }, 1000);
    });

    return this.profileExts;
  }

  public getJSON(gender?: string, region?: string): Promise<Array<ProfileExt>> {
    let loc = 'amount';
    if (gender != null && region != null && gender !== '' && region !== '') {
      loc = gender + '_' + region;
    } else if (gender != null && gender !== '') {
      loc = gender;
    } else if (region != null && region !== '') {
      loc = region;
    }
    return this.http.get<Array<ProfileExt>>('./assets/' + loc.toLowerCase() + '.json').toPromise();
}
}
