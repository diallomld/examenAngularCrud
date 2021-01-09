import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

  courses: any;
  coursesList?: AngularFireList<Course>;
  currentCourse?: Course;
  currentIndex = -1;

  pageSize = 5;
  pageSizes = [5, 10, 15];
  totalItems: number | undefined;
  page = 1;

  constructor(private courseService: CoursesService, private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.retrieveCourses();
  }

  refreshList(): void {
    this.currentCourse = undefined;
    this.currentIndex = -1;
    this.retrieveCourses();
  }

  retrieveCourses(){
    this.courseService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.courses = data;
      this.totalItems = data.length;
    });
  }

  setActiveCourse(tutorial: Course, index: number): void {
    this.currentCourse = tutorial;
    this.currentIndex = index;
  }

  removeAllCourses(): void {
    this.courseService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

  handlePageChange(event: any): void {
    this.page = event;
    this.retrieveCourses();
  }


}
