import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { City } from '../_models';

@Injectable()
export class CityService {
 constructor(private http: HttpClient) { }

 getAll() {
  return this.http.get<City[]>(`${config.apiUrl}/api/city`);
 }

 getById(id: string) {
  return this.http.get(`${config.apiUrl}/api/city/` + id);
 }

 create(city: City) {
  return this.http.post(`${config.apiUrl}/api/city`, city);
 }

 update(id: string, city: object) {
  return this.http.put(`${config.apiUrl}/api/city/` + id, city);
 }

 delete(id: string) {
  return this.http.delete(`${config.apiUrl}/api/city/` + id);
 }

 getCitysByIdentifier(identifier: string) {
  return this.http.get(`${config.apiUrl}/api/city/info/${identifier}`)
 }
}