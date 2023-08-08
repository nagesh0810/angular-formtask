import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [

  { path: '', redirectTo: '/form', pathMatch: 'full' }, 
  { path: 'form', component: FormComponent },
  { path: 'users', component: UserdetailsComponent },
  { path: 'users/:id', component: UserUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
