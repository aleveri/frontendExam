import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: 'create', component: CreateUserComponent },
      { path: 'list', component: ListUserComponent },
      { path: 'update', component: UpdateUserComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UserComponent, CreateUserComponent, ListUserComponent, UpdateUserComponent]
})
export class UserModule { }
