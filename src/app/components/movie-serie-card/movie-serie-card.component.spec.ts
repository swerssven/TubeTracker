import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSerieCardComponent } from './movie-serie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieSerieCardComponent;
  let fixture: ComponentFixture<MovieSerieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieSerieCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSerieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
