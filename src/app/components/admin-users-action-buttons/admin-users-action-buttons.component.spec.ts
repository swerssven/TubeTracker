import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersActionButtonsComponent } from './admin-users-action-buttons.component';

describe('AdminUsersActionButtonsComponent', () => {
  let component: AdminUsersActionButtonsComponent;
  let fixture: ComponentFixture<AdminUsersActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsersActionButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsersActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
