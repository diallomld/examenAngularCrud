import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { HomeComponent } from './components/home/home.component';
import { ListCoursesComponent } from './components/list-courses/list-courses.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'add-courses', component: AddCoursesComponent},
  {path: 'list-courses', component: ListCoursesComponent},
  // les routes pour les apis
  {path: 'posts', component: PostsListComponent},
  {path: 'posts/:id', component: PostDetailsComponent},
  {path: 'post/add', canActivate: [AuthGuardService], component: AddPostComponent},
  // routes pour l'authentification
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
