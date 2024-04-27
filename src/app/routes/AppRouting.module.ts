import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('../pages/edit/edit.module').then((m) => m.EditModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../pages/register/register.module').then((m) => m.RegisterModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
