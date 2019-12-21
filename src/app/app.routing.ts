import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


/**
 * @author - JamesLwin
 * @createdAt - DEC 22, 2019
 * @Mail - finderbar.theinlwin@gmail.com
*/

const routes: Routes = [
  {path:'auth', component: AuthComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
