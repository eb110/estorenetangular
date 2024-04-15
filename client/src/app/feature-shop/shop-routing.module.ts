import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path: '', component: ShopComponent}, //shop
  {path: ':id', component: ProductDetailsComponent}, //shop/:id
]

@NgModule({
  declarations: [],
  imports: [
    //this is bind with app routing
    //go to app routing
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
