import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwishlistproductComponent } from './userwishlistproduct.component';

describe('UserwishlistproductComponent', () => {
  let component: UserwishlistproductComponent;
  let fixture: ComponentFixture<UserwishlistproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserwishlistproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserwishlistproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
