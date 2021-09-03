import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './management/component/home/home.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'management',
    loadChildren: () => import('./management/management.module').then(module => module.ManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
