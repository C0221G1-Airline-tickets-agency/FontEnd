import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './client/component/home/home.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client/client.module').then(module => module.ClientModule)
  },
  {
    path: 'management',
    loadChildren: () => import('./management/management.module').then(module => module.ManagementModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
