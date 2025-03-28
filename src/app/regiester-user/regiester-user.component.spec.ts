import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiesterUserComponent } from './regiester-user.component';
import { AuthService } from '../services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('RegiesterUserComponent', () => {
  let component: RegiesterUserComponent;
  let fixture: ComponentFixture<RegiesterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegiesterUserComponent, ToastrModule.forRoot()],
      providers: [AuthService, provideHttpClient(), ToastrService, { provide: ActivatedRoute, useValue: { params: of({ id: '123' })} }]
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
