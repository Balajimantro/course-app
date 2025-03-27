import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiesterUserComponent } from './regiester-user.component';

describe('RegiesterUserComponent', () => {
  let component: RegiesterUserComponent;
  let fixture: ComponentFixture<RegiesterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegiesterUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegiesterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
