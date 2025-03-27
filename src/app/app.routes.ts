import { Routes } from '@angular/router';
import { RegiesterUserComponent } from './regiester-user/regiester-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: 'register', component: RegiesterUserComponent, canActivate: [loginGuard], },
    {path: 'login', component: LoginUserComponent, canActivate: [loginGuard],},

    {path: 'course', component: LayoutComponent, canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'create-course', component: CreateCourseComponent },
        ]
    }
];