import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TOAST_CONFIG, ToastrModule, ToastrService } from 'ngx-toastr';
import { LayoutComponent } from './layout.component';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, ToastrModule.forRoot()],
      providers: [AuthService, Router, AuthService, provideHttpClient(), ToastrService,  { provide: ActivatedRoute, useValue: { params: of({ id: '123' })} }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
