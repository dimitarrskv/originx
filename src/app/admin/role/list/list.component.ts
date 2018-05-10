import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DrawerService } from '@app/common/services/drawer.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class RoleListComponent implements OnInit, OnDestroy {

  id: string;
  rowChange = new BehaviorSubject<string>(undefined);

  constructor(
    public drawerService: DrawerService,
    private router: Router
  ) {
    this.rowChange.subscribe( _ => this.id = _ );
  }

  ngOnInit() {
    this.drawerService.open();
  }

  ngOnDestroy() {
    this.drawerService.close();
  }
}
