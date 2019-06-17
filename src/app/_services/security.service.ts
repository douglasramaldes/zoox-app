import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SecurityService {


 constructor(private http: HttpClient) {

 }

 authenticate(username: string, password: string) {

  let data = `client_id=zoox&client_secret=zoox@password&grant_type=password&password=${password}&username=${username}`;
  return this.http.post<any>(`${config.apiUrl}/oauth/token`, data);
 }

 setToken(token: string) {
  localStorage.setItem('token', token);
 }

 setUser(user: string) {
  localStorage.setItem('currentUser', JSON.stringify(user));
 }

 getToken() {
  return localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined';
 }

 getUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
 }

 logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');

 }

}