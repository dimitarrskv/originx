import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {

    constructor(public snackBar: MatSnackBar) { }

    success(message: string) {
        this.snackBar.open(message, 'DISMISS');
    }

    error(message: string) {
        this.snackBar.open(message, 'DISMISS');
    }
}
