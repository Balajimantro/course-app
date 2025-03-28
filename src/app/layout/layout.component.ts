import { Component, HostListener, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  userDatas: any;
  userDetailsPopup = signal(false)
  constructor( private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserById().subscribe((res) => {
      this.userDatas = res
    })
  }

  toggleUserDetailsPop() {
    this.userDetailsPopup.set(!this.userDetailsPopup()); 
  }

  signOut() {
    localStorage.removeItem('courseAuthToken')
    this.router.navigateByUrl('/login')
  }

  updateUserName: string = ''
  updateUserEmail: string = ''
  updateUserFile: File | null = null
  updateUserFormData = new FormData()

  updateImage($event: any) {
    const file = $event.target.files[0]
    if(file) {
      document.getElementById('file')!.style.color = "#212529"
      document.getElementById('fileSpan')!.style.display = "none"
      this.updateUserFile = file
    }
  }

  modalInstance: any

  updateProfile() {
    const formData = new FormData()
    if(this.updateUserName) formData.append("name", this.updateUserName)
    if(this.updateUserEmail) formData.append("email", this.updateUserEmail)
    if (this.updateUserFile) formData.append("profileImage", this.updateUserFile)

    if(this.updateUserName !== '' || this.updateUserEmail !== '' || this.updateUserFile !== null) {
      this.authService.updateUser(formData).subscribe((res: any) => {
        this.userDatas = res.user
        
      })
    } else {
      const model = document.getElementById('updateModel')
      if(model) {
        model.click()
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as Element;
    if (this.userDetailsPopup() && !targetElement.closest('.user_details')) {
      this.toggleUserDetailsPop()
    }
  }

  toggleHamberMenu() {
    const el = document.getElementById('hamberRouterLinkParent');
    if (el) {
      const isVisible = el.style.visibility === 'visible';
      
      if (isVisible) {
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
      } else {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }
    }
  }

}
