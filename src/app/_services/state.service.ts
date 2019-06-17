import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { State } from '../_models';

@Injectable()
export class StateService {
 constructor(private http: HttpClient) { }

 getAll() {
  return this.http.get<State[]>(`${config.apiUrl}/api/state`);
 }

 getById(id: string) {
  return this.http.get(`${config.apiUrl}/api/state/` + id);
 }

 create(state: State) {
  return this.http.post(`${config.apiUrl}/api/state`, state);
 }

 update(id: string, state: object) {
  return this.http.put(`${config.apiUrl}/api/state/` + id, state);
 }

 delete(id: string) {
  return this.http.delete(`${config.apiUrl}/api/state/` + id);
 }


 getStatesByIdentifier(identifier: string) {
  return this.http.get(`${config.apiUrl}/api/state/info/${identifier}`)
 }
}