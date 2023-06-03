import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AdminUsersActionButtonsComponent } from '../admin-users-action-buttons/admin-users-action-buttons.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Subscription } from 'rxjs';
import { IUserGrid } from 'src/app/interfaces/i-user-grid';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

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
        { field: 'firstName', headerName: this.translate.instant("FORM.FIRSTNAME"), filter: true, sortable: true },
        { field: 'lastName', headerName: this.translate.instant("FORM.LASTNAME"), width: 250, filter: true, sortable: true },
        { field: 'nickname', headerName: this.translate.instant("FORM.NICKNAME"), width: 200, filter: true, sortable: true },
        { field: 'email', headerName: this.translate.instant("FORM.EMAIL"), width: 300, filter: true, sortable: true },
        { field: 'isAdmin', headerName: 'Admin', width: 150, filter: true, sortable: true },
        {
          field: 'isActive',
          headerName: this.translate.instant("ADMIN.BLOCKED"),
          width: 150,
          filter: true,
          sortable: true,
          cellRenderer: (params: { value: any }) =>
            params.value ? 'No' : 'Yes',
        },
        {
          headerName: this.translate.instant("ADMIN.ACTIONS"),
          width: 350,
          cellRenderer: AdminUsersActionButtonsComponent,
          cellRendererParams: {
            makeAdmin: this.makeAdmin.bind(this),
            deleteUser: this.deleteUser.bind(this),
            blockUser: this.blockUser.bind(this),
            context: this
          },
        },
      ],
      onGridReady: (params) => params.api?.sizeColumnsToFit(),
    };

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserServiceService,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.getUserList()
  }

  makeAdmin(userId: number, isAdmin: boolean): void {
    this.subscriptions.add(this.userService.MakeUserAdmin(userId, !isAdmin).subscribe(
      (data) => this.getUserList()
    ))
  }

  deleteUser(userId: number): void {
    this.subscriptions.add(this.userService.DeleteUser(userId).subscribe(
      (data) => this.getUserList()
    ))
  }

  blockUser(userId: number, isActive:boolean): void {
    this.subscriptions.add(this.userService.ChangeUserState(userId, !isActive).subscribe(
      (data) => this.getUserList()
    ))
  }

  getUserList(){
    this.subscriptions.add(this.userService.GetUserList().subscribe(
      (data) => {
        this.rowData = data;
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
