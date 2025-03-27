import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { ToastrService } from 'ngx-toastr';

interface Icourse {
  className: string;
  subject: string;
  board: string;
  latitude: string;
  longitude: string;
  _id: string;
  createdBy: string
}

@Component({
  selector: 'app-create-course',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnInit {
  createCoureceForm!: FormGroup;
  allCoursesByUser: Icourse[] = []

  constructor(private formBuilder: FormBuilder, private cs: CourseService, public toastr: ToastrService,) {}

  ngOnInit() {
    this.initailizeForm()
    this.getLocation()
    this.getCouresesById()

    this.createCoureceForm.get('board')?.valueChanges.subscribe((value) => {
      if(value) {
        this.createCoureceForm.get('board')?.setValue(value.toUpperCase(), { emitEvent: false }); 
      }
    });
  }

  initailizeForm() {
    this.createCoureceForm = this.formBuilder.group({
      className: ['', Validators.required],
      subject: ['',  Validators.required],
      board: ['',  Validators.required],
      latitude: ['',  Validators.required],
      longitude: ['',  Validators.required],
    });
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.createCoureceForm.patchValue({
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

  onCreateCourse() {
    if(this.createCoureceForm.valid) {
      this.cs.createCourse(this.createCoureceForm.value).subscribe((res: any) => {
        console.log('Response:', res);  
        this.toastr.success('Course Created Successfully'), {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-bottom-center'
        };
        this.createCoureceForm.reset();
        this.getCouresesById()  
      })
    }else {
      this.createCoureceForm.markAllAsTouched();
    }
  }

  getCouresesById() {
    this.cs.getCourseById().subscribe((res: any) => {
      console.log(res)
      this.allCoursesByUser = res
    })
  }

  courseId: any;
  editIndex: number | null = null;
  editCourse(i: number) {
    const createForm = document.getElementById('createForm');
    createForm?.scrollIntoView({ behavior: 'smooth' });
    this.createCoureceForm.patchValue(this.allCoursesByUser[i]);
    this.courseId = this.allCoursesByUser[i]._id;
    this.editIndex = i;
  }

  updateCourse(index: number) {
    const currentdata = this.allCoursesByUser[index];

    const formdata = {
      className: this.createCoureceForm.get('className')?.value,
      subject: this.createCoureceForm.get('subject')?.value,
      board: this.createCoureceForm.get('board')?.value,
    }
    const isChanged =
    currentdata.className !== formdata.className ||
    currentdata.subject !== formdata.subject ||
    currentdata.board !== formdata.board

    if(isChanged) {
      if(this.createCoureceForm.valid) {
        this.cs.updateCourse(this.courseId, this.createCoureceForm.value).subscribe((res: any) => {
          this.courseId = '';
          console.log('Response:', res);  
          this.toastr.success('Course Updated Successfully'), {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-bottom-center'
          };
          this.createCoureceForm.reset();
          this.getCouresesById()  
        })
      }
    } else {
      document.getElementById('noChanges')!.style.display = 'block';
      setTimeout(() => {
        document.getElementById('noChanges')!.style.display = 'none';
      }, 2000);
    }
  }

  deleteCourse(index: number) {
    console.log(this.allCoursesByUser[index]._id)
    this.cs.deleteCourse(this.allCoursesByUser[index]._id).subscribe((res: any) => {
      console.log('Response:', res);  
      this.toastr.success('Course Deleted Successfully'), {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-bottom-center'
      };
      this.getCouresesById()  
    })
  }
}
