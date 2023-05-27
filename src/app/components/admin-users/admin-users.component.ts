import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AdminUsersActionButtonsComponent } from '../admin-users-action-buttons/admin-users-action-buttons.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Subscription } from 'rxjs';
import { IUserGrid } from 'src/app/interfaces/i-user-grid';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent {

  rowData: IUserGrid[] = [];
  subscriptions: Subscription = new Subscription();


  gridOptions: GridOptions = {
      columnDefs: [
        { field: 'firstName', headerName: 'Firstname' },
        { field: 'lastName', headerName: 'Lastname', width: 250 },
        { field: 'nickname', headerName: 'Nickname', width: 200 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'isAdmin', headerName: 'Is admin', width: 150 },
        {
          field: 'blocked',
          headerName: 'Blocked',
          width: 150,
          cellRenderer: (params: { value: any }) =>
            params.value ? 'Yes' : 'No',
        },
        {
          headerName: 'Actions',
          width: 350,
          cellRendererFramework: AdminUsersActionButtonsComponent,
          cellRendererParams: {
            makeAdmin: this.makeAdmin.bind(this),
            deleteUser: this.deleteUser.bind(this),
            blockUser: this.blockUser.bind(this),
            emailUser: this.emailUser.bind(this),
          },
        },
      ],
      onGridReady: (params) => params.api?.sizeColumnsToFit(),
    };

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserServiceService) {}

  ngOnInit(): void {


    this.subscriptions.add(this.userService.GetUserList().subscribe(
      (data) => {
        this.rowData = data;
        console.log(this.rowData);
      }
    ));
  }

  makeAdmin(userId: number): void {
    // this.users = this.users.filter((user) => user.id !== userId);
    // this.gridOptions.api?.setRowData(this.users);
  }

  deleteUser(userId: number): void {
    // this.users = this.users.filter((user) => user.id !== userId);
    // this.gridOptions.api?.setRowData(this.users);
  }

  blockUser(userId: number): void {
    // this.users = this.users.map((user) => {
    //   if (user.id === userId) {
    //     return { ...user, blocked: true };
    //   }
    //   return user;
    // });
    // this.gridOptions.api?.refreshCells();
  }

  emailUser(email: string): void {
    console.log('Email:', email);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}