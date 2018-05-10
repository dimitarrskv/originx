import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DrawerService {

    toggle = new BehaviorSubject(false);

    constructor() { }

    open() {
        this.toggle.next(true);
    }

    close() {
        this.toggle.next(false);
    }
}
