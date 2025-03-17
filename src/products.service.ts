import { Injectable } from '@angular/core';

enum ProductCategory {
  Shampoo = 'Shampoo',
  Conditioner = 'Conditioner',
  Styling = 'Styling',
  Treatment = 'Treatment',
  Tools = 'Tools'
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  featured: boolean;
  category: ProductCategory;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Hydrating Silk Shampoo',
      description: 'Luxurious moisturizing shampoo with silk proteins and argan oil for smooth, silky hair.',
      price: 24.99,
      featured: true,
      category: ProductCategory.Shampoo
    },
    {
      id: 2,
      name: 'Keratin Repair Conditioner',
      description: 'Deep conditioning treatment with keratin complex for damaged hair restoration.',
      price: 26.99,
      featured: false,
      category: ProductCategory.Conditioner
    },
    {
      id: 3,
      name: 'Texture Master Styling Paste',
      description: 'Medium-hold styling paste for natural-looking texture and definition.',
      price: 18.99,
      featured: true,
      category: ProductCategory.Styling
    },
    {
      id: 4,
      name: 'Intensive Repair Hair Mask',
      description: 'Weekly deep conditioning mask with vitamin E and coconut oil.',
      price: 32.99,
      featured: true,
      category: ProductCategory.Treatment
    },
    {
      id: 5,
      name: 'Pro Series Ceramic Hair Dryer',
      description: 'Professional-grade ionic hair dryer with multiple heat and speed settings.',
      price: 149.99,
      featured: true,
      category: ProductCategory.Tools
    },
    {
      id: 6,
      name: 'Volume Boost Dry Shampoo',
      description: 'Refreshing dry shampoo that adds volume while absorbing excess oil.',
      price: 19.99,
      featured: false,
      category: ProductCategory.Shampoo
    },
    {
      id: 7,
      name: 'Color Protection Conditioner',
      description: 'Color-safe conditioner with UV protection to maintain vibrant hair color.',
      price: 22.99,
      featured: false,
      category: ProductCategory.Conditioner
    },
    {
      id: 8,
      name: 'Sculpting Clay Pomade',
      description: 'Strong-hold clay pomade for precise styling and matte finish.',
      price: 21.99,
      featured: true,
      category: ProductCategory.Styling
    },
    {
      id: 9,
      name: 'Scalp Therapy Treatment',
      description: 'Soothing scalp treatment that promotes healthy hair growth.',
      price: 28.99,
      featured: false,
      category: ProductCategory.Treatment
    },
    {
      id: 10,
      name: 'Professional Styling Brush Set',
      description: 'Set of 4 professional ceramic brushes for various styling needs.',
      price: 45.99,
      featured: false,
      category: ProductCategory.Tools
    },
    {
      id: 11,
      name: 'Clarifying Tea Tree Shampoo',
      description: 'Deep cleansing shampoo with tea tree oil for refreshed scalp.',
      price: 23.99,
      featured: false,
      category: ProductCategory.Shampoo
    },
    {
      id: 12,
      name: 'Moisture Lock Leave-in Conditioner',
      description: 'Lightweight leave-in conditioner for all-day moisture protection.',
      price: 20.99,
      featured: true,
      category: ProductCategory.Conditioner
    },
    {
      id: 13,
      name: 'Flexible Hold Hair Spray',
      description: 'Medium-hold hairspray that maintains style while allowing movement.',
      price: 17.99,
      featured: false,
      category: ProductCategory.Styling
    },
    {
      id: 14,
      name: 'Bond Strengthening Treatment',
      description: 'Professional strength bond repair treatment for damaged hair.',
      price: 38.99,
      featured: true,
      category: ProductCategory.Treatment
    },
    {
      id: 15,
      name: 'Precision Cutting Scissors',
      description: 'Professional-grade stainless steel hair cutting scissors.',
      price: 89.99,
      featured: false,
      category: ProductCategory.Tools
    },
    {
      id: 16,
      name: 'Volumizing Root Lift Spray',
      description: 'Root-lifting spray for instant volume and body.',
      price: 19.99,
      featured: false,
      category: ProductCategory.Styling
    },
    {
      id: 17,
      name: 'Curl Defining Cream',
      description: 'Moisturizing cream that enhances natural curls without frizz.',
      price: 24.99,
      featured: true,
      category: ProductCategory.Styling
    },
    {
      id: 18,
      name: 'Heat Protection Serum',
      description: 'Protective serum that guards against heat styling damage.',
      price: 25.99,
      featured: false,
      category: ProductCategory.Treatment
    },
    {
      id: 19,
      name: 'Smoothing Anti-Frizz Oil',
      description: 'Lightweight oil that tames frizz and adds shine.',
      price: 27.99,
      featured: true,
      category: ProductCategory.Treatment
    },
    {
      id: 20,
      name: 'Professional Flat Iron',
      description: 'Ceramic-titanium flat iron with adjustable temperature settings.',
      price: 129.99,
      featured: false,
      category: ProductCategory.Tools
    }
  ];
  
  getProducts(): Product[] {
    return this.products;
  }

  getFeaturedProducts(): Product[] {
    return this.products.filter(product => product.featured);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getCategories(): string[] {
    return Object.values(ProductCategory);
  }
}