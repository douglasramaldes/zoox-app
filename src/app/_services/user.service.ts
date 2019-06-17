import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/api/user`);
    }

    getById(id: string) {
        return this.http.get(`${config.apiUrl}/api/user/` + id);
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/api/signup`, user);
    }

    update(id: string, user: object) {
        return this.http.put(`${config.apiUrl}/api/user/` + id, user);
    }

    delete(id: string) {
        return this.http.delete(`${config.apiUrl}/api/user/` + id);
    }

    getUsersByIdentifier(identifier: string) {
        return this.http.get(`${config.apiUrl}/api/user/info/${identifier}`)
    }
}