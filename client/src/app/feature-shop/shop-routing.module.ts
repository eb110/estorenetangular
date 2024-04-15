import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

//xng-breadcrumb runs with rooting
//we require some data in the source of breadcrumb location (core/sectionheader)
//the data has to be provided by the production-details
//as shop routing handles the production-details AND is the part of the routing
//here is the connectio point to declare the data

const routes: Routes = [
  {path: '', component: ShopComponent}, //shop
  //breadcrumb data obtain place => got od product details component
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}}, //shop/:id
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
