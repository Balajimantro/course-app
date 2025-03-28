import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCourseComponent } from './create-course.component';
import { CourseService } from '../services/course.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TOAST_CONFIG, ToastrModule, ToastrService } from 'ngx-toastr';


describe('CreateCourseComponent', () => {
  let component: CreateCourseComponent;
  let fixture: ComponentFixture<CreateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCourseComponent, ToastrModule.forRoot()],
      providers: [CourseService, ToastrService, provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
