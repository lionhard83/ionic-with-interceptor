import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleRestaurantPage } from './single-restaurant.page';

const routes: Routes = [
  {
    path: ':id',
    component: SingleRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleRestaurantPageRoutingModule {}
