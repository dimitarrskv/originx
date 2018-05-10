import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DrawerService } from '@app/common/services/drawer.service';
import { Router } from '@angular/router';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError} from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { RoleService, ListApi, Role } from '../../role.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { RoleCreateComponent } from '../../create/role-create.component';

@Component({
  selector: 'app-role-list-drawer',
  templateUrl: './role-list-drawer.component.html',
  styleUrls: ['./role-list-drawer.component.scss']
})
export class RoleListDrawerComponent implements OnInit {

  @Input() rowChange: BehaviorSubject<string>;

  displayedColumns = ['name'];
  dataSource = new MatTableDataSource();
  filter = '';
  filterChange = new BehaviorSubject<string>('');

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.filter = filterValue;
    this.filterChange.next(filterValue);
  }

  constructor(
    public http: HttpClient,
    public userService: RoleService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.filterChange.pipe(debounceTime(500)))
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService.list(
            this.filter,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageSize || 10,
            this.paginator.pageIndex || 0);
        }),
        map((res: ListApi) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = res.flags.count;

          return res.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoleCreateComponent, {
      width: '530px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  selectRow(id: any) {
    this.rowChange.next(id);
  }

}
