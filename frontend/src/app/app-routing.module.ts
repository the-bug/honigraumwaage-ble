import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'weighing',
    loadChildren: () => import('./weighing-module/weighing-module.module').then(mod => mod.WeighingModuleModule),
  },
  {
    path: '',
    redirectTo: '/weighing',
    pathMatch: 'full'
  },
  {
    path: '*',
    redirectTo: '/weighing'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
