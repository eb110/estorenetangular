//obtaining a parameter from link

import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private shopService: ShopService, 
    private activatedRoute: ActivatedRoute,
    //breadcrumb data to send
    private bcService: BreadcrumbService
    //we have to refresh the breadcrumb title to empty string
    //as it takes a time before the actual name will be applied in line 40
    //without it => the previous name is still attached during the fetch process
  ) {this.bcService.set('@productDetails', ' ')}

  id = this.activatedRoute.snapshot.paramMap.get('id')
  product?: Product;

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    if(this.id){
    this.shopService.getProductDetails(+this.id).subscribe({
      next: (response) => 
      {
        this.product = response;
        //dynamic attachmend of the alias of breadcrumb 'productDetails' => go to shop routing
        this.bcService.set('@productDetails', this.product.name)
      },
      error: (error) => console.log(error),
    });
  }}}
