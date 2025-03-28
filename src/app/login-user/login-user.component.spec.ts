import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TOAST_CONFIG, ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginUserComponent } from './login-user.component';
import { AuthService } from '../services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { routes } from '../app.routes';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUserComponent, ToastrModule.forRoot()],
      providers: [AuthService, provideHttpClient(), ToastrService, 
        { provide: ActivatedRoute, useValue: { params: of({ id: '123' })} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
