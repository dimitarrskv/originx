import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '@app/common/services/configuration.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        private configurations: ConfigurationService
    ) { }

    list(filter: string, sort: string, order: string, limit: number, page: number): Observable<ListApi> {
        const href = 'http://localhost:4300/user/list';
        const requestUrl =
            `${href}?filter=${filter}&sort=${sort}&order=${order}&limit=${limit}&page=${page + 1}`;

        return this.http.get<ListApi>(requestUrl);
      }
}

export interface ListApi {
    data: User[];
    flags: Flags;
}

export interface Flags {
    count: number;
}

export interface User {
    email: string;
    name: string;
    location: string;
    website: string;
}
