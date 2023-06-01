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
        { field: 'firstName', headerName: 'Firstname', filter: true, sortable: true },
        { field: 'lastName', headerName: 'Lastname', width: 250, filter: true, sortable: true },
        { field: 'nickname', headerName: 'Nickname', width: 200, filter: true, sortable: true },
        { field: 'email', headerName: 'Email', width: 300, filter: true, sortable: true },
        { field: 'isAdmin', headerName: 'Is admin', width: 150, filter: true, sortable: true },
        {
          field: 'isActive',
          headerName: 'Blocked',
          width: 150,
          filter: true,
          sortable: true,
          cellRenderer: (params: { value: any }) =>
            params.value ? 'No' : 'Yes',
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
