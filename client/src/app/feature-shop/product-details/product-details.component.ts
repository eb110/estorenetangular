//obtaining a parameter from link

import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private shopService: ShopService, 
    private activatedRoute: ActivatedRoute
  ) {}

  id = this.activatedRoute.snapshot.paramMap.get('id')
  product?: Product;

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    if(this.id){
    this.shopService.getProductDetails(+this.id).subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (error) => console.log(error),
    });
  }}}
