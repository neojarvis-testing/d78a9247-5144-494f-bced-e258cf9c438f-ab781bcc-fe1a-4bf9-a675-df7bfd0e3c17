import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraddcartComponent } from './useraddcart.component';

describe('UseraddcartComponent', () => {
  let component: UseraddcartComponent;
  let fixture: ComponentFixture<UseraddcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseraddcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraddcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
