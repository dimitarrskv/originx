import {Component} from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon('facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/facebook.svg'));
    this.matIconRegistry.addSvgIcon('google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/google.svg'));
    this.matIconRegistry.addSvgIcon('instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/instagram.svg'));
  }

  showFiller = false;
}