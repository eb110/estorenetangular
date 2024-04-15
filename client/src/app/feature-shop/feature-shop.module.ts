import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    //lazy loading handled by shop routing module instead of routing module
    ShopRoutingModule
  ]
  //export is no longer needed as we don't wont to trigger it with the app module
  //this module should be triggered only if user will click shop link (lazy load)
  // exports: [
  //   ShopComponent
  // ]
})
export class FeatureShopModule { }
