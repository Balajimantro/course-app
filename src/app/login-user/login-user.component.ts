import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-user',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent implements OnInit {
  loginForm!: FormGroup;

  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, public toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.initailizeForm();
  }

  initailizeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['',  Validators.required]
    });
  }

  onLogin() {
    if(this.loginForm.valid) {
    this.authService.loginUser(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('courseAuthToken', res.token);
      this.toastr.success('Login Successfully');
      this.router.navigateByUrl('/course/dashboard')
    }, (error) => {
      console.error('Error:', error);
      this.toastr.error('Login Failed');
    });
    }else {
      this.loginForm.markAllAsTouched();
    }
  }

}
