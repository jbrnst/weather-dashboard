import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategories: string[] = [];
  searchTerm: string = '';
  showFeatured: boolean = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.categories = this.productsService.getCategories();
    this.filteredProducts = [...this.products];
  }

  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.filterProducts();
  }

  filterProducts() {
    const searchTermLower = this.searchTerm.toLowerCase();
    
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTermLower);
      const matchesFeatured = this.showFeatured ? product.featured : true;
      const matchesCategory = this.selectedCategories.length === 0 || 
                            this.selectedCategories.includes(product.category);
      
      return matchesSearch && matchesFeatured && matchesCategory;
    });
  }
}