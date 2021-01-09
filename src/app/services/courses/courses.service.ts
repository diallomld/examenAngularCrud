import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Course } from 'src/app/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private dbTable = 'courses';
  coursesRef: AngularFireList<Course>;

  constructor(private db: AngularFireDatabase) {
    this.coursesRef = db.list(this.dbTable);
   }

   getAll(): AngularFireList<Course>{
     return this.coursesRef;
   }

   create(course: Course): any{
     return this.coursesRef.push(course);
   }

   update(id: string, value: any): Promise<void> {
    return this.coursesRef.update(id, value);
  }
  delete(id: string): Promise<void> {
    return this.coursesRef.remove(id);
  }

  deleteAll(): Promise<void> {
    return this.coursesRef.remove();
  }
}
