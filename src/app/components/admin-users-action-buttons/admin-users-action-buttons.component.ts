import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users-action-buttons',
  templateUrl: './admin-users-action-buttons.component.html',
  styleUrls: ['./admin-users-action-buttons.component.scss']
})
export class AdminUsersActionButtonsComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  makeAdmin(): void {
    const userId = this.params.data.id;
    this.params.context.componentParent.deleteUser(userId);
  }

  emailUser(): void {
    const email = this.params.data.email;
    this.params.context.componentParent.emailUser(email);
  }

  blockUser(): void {
    const userId = this.params.data.id;
    this.params.context.componentParent.blockUser(userId);
  }

  deleteUser(): void {
    const userId = this.params.data.id;
    this.params.context.componentParent.deleteUser(userId);
  }
}
