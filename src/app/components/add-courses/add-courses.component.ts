import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  form: FormGroup;
  course: Course = new Course();
  submitted = false;

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder, private courseService: CoursesService) {
    this.form = this.fb.group({
      nom: [],
      comment: []
    });
  }

  addCourses(): void {
    this.courseService.create(this.course).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }
  newCourse(): void {
    this.submitted = false;
    this.course = new Course();
  }

}
