import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendancePortalComponent } from './components/attendance-portal/attendance-portal.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path : "" , component: LoginComponent},
  {path : "attendance" , component: AttendancePortalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
