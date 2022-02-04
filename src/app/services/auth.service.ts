import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

export interface Token {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  signup(credentials: {name: string; surname: string; email: string; password: string; os: string}) {
    return this.httpClient.post<{message: string}>(`${environment.host}/v2/auth/signup`, credentials)
    .toPromise();
  }

  login(credentials: {email: string; password}) {
    return this.httpClient.post<Token>(`${environment.host}/v2/auth/login`, credentials)
    .toPromise();
  }

  me() {
    return this.httpClient.get<Record<string, any>>(`${environment.host}/v2/auth/me`)
    .toPromise();
  }

  async isLogged() {
    return Boolean(this.storageService.get('accessToken'));
  }


}
