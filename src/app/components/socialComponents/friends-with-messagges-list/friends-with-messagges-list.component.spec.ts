import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsWithMessaggesListComponent } from './friends-with-messagges-list.component';

describe('FriendsWithMessaggesListComponent', () => {
  let component: FriendsWithMessaggesListComponent;
  let fixture: ComponentFixture<FriendsWithMessaggesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsWithMessaggesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsWithMessaggesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
