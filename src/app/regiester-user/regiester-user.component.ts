import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-regiester-user',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './regiester-user.component.html',
  styleUrl: './regiester-user.component.css'
})
export class RegiesterUserComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router, public toastr: ToastrService) {}

  ngOnInit() {
    this.initailizeForm();
    this.getLocation()
  }


  initailizeForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      profileImage: [null, Validators.required] 
    });
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.registerForm.patchValue({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.registerForm.patchValue({ profileImage: this.selectedFile });
    }
  }
  
  onSubmit() {
    if(this.registerForm.valid) {
      const formData = new FormData();
      formData.append("name", this.registerForm.get("name")!.value);
      formData.append("email", this.registerForm.get("email")!.value);
      formData.append("password", this.registerForm.get("password")!.value);
      formData.append("latitude", this.registerForm.get("latitude")!.value);
      formData.append("longitude", this.registerForm.get("longitude")!.value);
      formData.append("profileImage", this.selectedFile!); // Image file
      this.authService.registerUser(formData).subscribe(
        (response) => {
          this.registerForm.reset();
          this.toastr.success('Redirect to login page', 'Register Successfully', {
            timeOut: 2000,
          });
          setTimeout(() => {
            this.route.navigate(['/login']);
          }, 2000)
        },
        (error) => {
          this.toastr.error(error.error, 'Register failed', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.registerForm.markAllAsTouched()
    }
  }
}
