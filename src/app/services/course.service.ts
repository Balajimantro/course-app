import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  createCourse(course: any) {   
    return this.http.post(`${this.apiUrl}course/createCourse`, course, { headers: this.getHeaders() });
  }

  getCourseById() {
    return this.http.get(`${this.apiUrl}course/getCourseById`, { headers: this.getHeaders() });
  }

  getAllCourses(lat: number, long: number): Observable<any> {
    return this.http.get(`${this.apiUrl}course/getAllCourses?lat=${lat}&long=${long}`, { headers: this.getHeaders() });
  }

  updateCourse(id: any, course: any) {
    return this.http.put(`${this.apiUrl}course/updateCourse/${id}`, course, { headers: this.getHeaders() });
  }

  deleteCourse(id: any) {
    return this.http.delete(`${this.apiUrl}course/deleteCourse/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return { Authorization: `Bearer ${localStorage.getItem('courseAuthToken')}` };
  }
}
