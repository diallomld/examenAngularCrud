import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './posts/components/add-post/add-post.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PostDetailsComponent } from './posts/components/post-details/post-details.component';
import { PostsListComponent } from './posts/components/posts-list/posts-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CommentsListComponent } from './comments/components/comments-list/comments-list.component';
import { CommentDetailsComponent } from './comments/components/comment-details/comment-details.component';
import { AddCommentComponent } from './comments/components/add-comment/add-comment.component';
import { UsersListComponent } from './users/components/users-list/users-list.component';
import { UserDetailsComponent } from './users/components/user-details/user-details.component';
import { AddUserComponent } from './users/components/add-user/add-user.component';
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  // les routes pour l'api post
  {path: 'posts', component: PostsListComponent},
  {path: 'posts/:id', component: PostDetailsComponent},
  {path: 'post/add', canActivate: [AuthGuardService], component: AddPostComponent},
  // les routes pour l'api comment
  {path: 'comments', component: CommentsListComponent},
  {path: 'comments/:id', component: CommentDetailsComponent},
  {path: 'comment/add', canActivate: [AuthGuardService], component: AddCommentComponent},
  // les routes pour l'api user
  {path: 'users', component: UsersListComponent},
  {path: 'users/:id', component: UserDetailsComponent},
  {path: 'user/add', canActivate: [AuthGuardService], component: AddUserComponent},
  // routes pour l'authentification
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
