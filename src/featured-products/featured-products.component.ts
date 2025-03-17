import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css'],
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts:any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.featuredProducts = this.productsService.getFeaturedProducts();
  }
}
