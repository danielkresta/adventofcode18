import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolutionComponent } from './components/solution/solution.component';

const routes: Routes = [
    { path: 'day/:id', component: SolutionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
