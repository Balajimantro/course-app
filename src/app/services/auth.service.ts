import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = baseUrl.baseUrl

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

  isUserLoggedIn() {
    return this.http.post(`${this.apiUrl}auth/validateToken`,{}, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return { Authorization: `Bearer ${localStorage.getItem('courseAuthToken')}` };
  }
}
