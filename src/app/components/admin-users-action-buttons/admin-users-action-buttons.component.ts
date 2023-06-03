import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-users-action-buttons',
  templateUrl: './admin-users-action-buttons.component.html',
  styleUrls: ['./admin-users-action-buttons.component.scss'],
})
export class AdminUsersActionButtonsComponent {
  params: any;

  constructor(private translate: TranslateService) {}

  agInit(params: any): void {
    this.params = params;
  }

  makeAdmin(): void {
    if (confirm(this.translate.instant('ADMIN.SURE_ACTION'))) {
      const userId = this.params.data.userId;
      const isAdmin = this.params.data.isAdmin;
      this.params.makeAdmin(userId, isAdmin);
    }
  }

  blockUser(): void {
    if (confirm(this.translate.instant('ADMIN.SURE_ACTION'))) {
      const userId = this.params.data.userId;
      const isActive = this.params.data.isActive;
      this.params.blockUser(userId, isActive);
    }
  }

  deleteUser(): void {
    if (confirm(this.translate.instant('ADMIN.SURE_ACTION'))) {
      const userId = this.params.data.userId;
      this.params.deleteUser(userId);
    }
  }
}
