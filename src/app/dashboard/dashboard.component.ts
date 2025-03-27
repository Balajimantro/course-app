import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';

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
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  allCoureseList: Icourse[] = []
  loader: boolean = true
  constructor(private cs: CourseService,) {}

  ngOnInit() {
    this.getAllCourses()
  }

  getAllCourses() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      this.cs.getAllCourses(lat, long).subscribe((data) => (
        this.loader = false,
        this.allCoureseList = data
      ));
    });
  }
}
