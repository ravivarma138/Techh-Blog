import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExpandComponent } from './card-expand.component';

describe('CardExpandComponent', () => {
  let component: CardExpandComponent;
  let fixture: ComponentFixture<CardExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardExpandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
