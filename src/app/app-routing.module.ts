import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/components/login/login.component';
import { TaskListComponent } from './components/tasks/components/task-list/task-list.component';
import { AuthGuard } from './authentication/auth-guard/auth.guard';
import { TaskDetailComponent } from './components/tasks/components/task-detail/task-detail.component';
import { TaskEditComponent } from './components/tasks/components/task-edit/task-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'task-edit/:id', component: TaskEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
