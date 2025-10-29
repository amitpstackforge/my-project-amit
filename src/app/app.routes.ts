import { Routes } from '@angular/router';
import { LoginForm } from './login-form/login-form';
import { ProfileCard } from './profile-card/profile-card';
import { TodoListComponent } from './todo/todo-list/todo-list';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: LoginForm },
    { path: 'about', component: ProfileCard },
    { path: 'todo', component: TodoListComponent }
];
