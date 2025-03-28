import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}auth/register`, user);
  }

  loginUser(user: any) {
    return this.http.post(`${this.apiUrl}auth/login`, user);
  }

  getUserById() {
    return this.http.get(`${this.apiUrl}auth/user`, { headers: this.getHeaders() });
  }

  updateUser(user: any) {
    return this.http.put(`${this.apiUrl}auth/updateUser`, user, { headers: this.getHeaders() });
  }

  isUserLoggedIn(): Observable<any>  {
    return this.checkUser();
  }

  private getHeaders() {
    return { Authorization: `Bearer ${localStorage.getItem('courseAuthToken')}` };
  }

  private checkUser() {
    if(!localStorage.getItem('courseAuthToken')) return of(false);
    const header =  { Authorization: `Bearer ${localStorage.getItem('courseAuthToken')}` };
    return this.http.post(`${this.apiUrl}auth/validateToken`,{}, { headers: header });
  }
}
