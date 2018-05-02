import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

    constructor( ) {

    }

    get originXBaseUrl(): string {
        return 'http://localhost:4200';
    }

    get userXBaseUrl(): string {
        return 'http://localhost:4300';
    }

    get instagramOAuthUrl(): string {
        return 'https://instagram.com/oauth/authorize';
    }

    get googleOAuthUrl(): string {
        return 'https://accounts.google.com/o/oauth2/v2/auth';
    }

    get fbClientID(): string {
        return '338634086546481';
    }

    get instagramClientID(): string {
        return '950b8990ec224aabb8cfe140a50e3a88';
    }

    get googleClientID(): string {
        return '326833504315-9l02474j1nsukl5nkppaeca2dcf9041u.apps.googleusercontent.com';
    }
}
