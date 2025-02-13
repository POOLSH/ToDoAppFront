import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './auth/signIn.component';
import {SignUpComponent} from './auth/signUp.component';
import {TaskListComponent} from './tasks/task-list.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: 'auth/sign-in', component: SignInComponent },
  { path: 'auth/sign-up', component: SignUpComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
