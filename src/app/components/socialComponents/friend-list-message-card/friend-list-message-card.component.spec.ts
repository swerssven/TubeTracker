import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListMessageCardComponent } from './friend-list-message-card.component';

describe('FriendListMessageCardComponent', () => {
  let component: FriendListMessageCardComponent;
  let fixture: ComponentFixture<FriendListMessageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendListMessageCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendListMessageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
