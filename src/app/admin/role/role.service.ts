import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '@app/common/services/configuration.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoleService {

    constructor(
        private http: HttpClient,
        private configurations: ConfigurationService
    ) { }

    list(filter: string, sort: string, order: string, limit: number, page: number): Observable<ListApi> {
        const href = this.configurations.userXBaseUrl + '/role/list';
        const requestUrl =
            `${href}?filter=${filter}&sort=${sort}&order=${order}&limit=${limit}&page=${page + 1}`;

        return this.http.get<ListApi>(requestUrl);
    }

    getById(id: string): Observable<Role> {
        const href = this.configurations.userXBaseUrl + '/role';
        const requestUrl =
            `${href}/${id}`;

        return this.http.get<Role>(requestUrl);
    }

    create(data: any) {
        return new Promise((resolve, reject) => {
            return this.http.post(this.configurations.userXBaseUrl + `/role/create`, data, { observe: 'response' })
                .toPromise();
        });
    }

    update(data: any) {
        return new Promise((resolve, reject) => {
            return this.http.post(this.configurations.userXBaseUrl + `/role/update`, data, { observe: 'response' })
                .toPromise();
        });
    }
}

export interface ListApi {
    data: Role[];
    flags: Flags;
}

export interface Flags {
    count: number;
}

export interface Role {
    name: string;
    description: string;
}
