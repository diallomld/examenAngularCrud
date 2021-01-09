import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  @Input() course?: Course;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentCourse: Course = {
    nom: '',
    comment: '',
  };
  message = '';

  isUpdated: boolean | undefined;
  isDeleted: boolean | undefined;

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentCourse = { ...this.course };
  }

  updateCourse(): void {
    const data = {
      nom: this.currentCourse.nom,
      comment: this.currentCourse.comment
    };

    if (this.currentCourse.key) {
      this.courseService.update(this.currentCourse.key, data)
        .then(() => {
          this.isUpdated = true;
          this.message = 'la course a ete modifié avec success!';
        })
        .catch(err => console.log(err));
    }
  }

  deleteCourse(): void {
    if (this.currentCourse.key) {
      this.courseService.delete(this.currentCourse.key)
        .then(() => {
          this.refreshList.emit();
          this.isDeleted = true;
          this.message = 'la course a ete supprimer avec success!';
        })
        .catch(err => console.log(err));
    }
  }

}
