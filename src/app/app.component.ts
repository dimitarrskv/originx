import {Component, ViewChild, AfterViewInit, AfterViewChecked, OnInit} from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DrawerService } from '@app/common/services/drawer.service';
import { MatDrawer } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer') drawer: MatDrawer;
  showFiller = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private drawerService: DrawerService
  ) {
    this.registerIcons();
  }

  ngOnInit() {
    this.drawerService.toggle.subscribe(
      _ => {
        _ ? this.drawer.open() : this.drawer.close();
      }
    );
  }

  registerIcons() {
    this.matIconRegistry.addSvgIcon('facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/facebook.svg'));
    this.matIconRegistry.addSvgIcon('google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/google.svg'));
    this.matIconRegistry.addSvgIcon('instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/instagram.svg'));
  }

  ngAfterViewInit() {
    // this.drawerService.toggle.subscribe(
    //   _ => _ ? this.drawer.open() : this.drawer.close()
    // );
  }
}
