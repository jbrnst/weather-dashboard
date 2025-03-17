import { Injectable } from '@angular/core';

@Injectable()
export class SalonServicesService {

  constructor() { }

  getServices() {
    return [
      {
        title: "Men's Haircuts and Trims",
        description: 'Professional cuts and trims tailored to your style and preference.',
      },
      {
        title: "Women's Haircuts and Trims",
        description: 'Stylish cuts and trims, from classic to trendy, designed for you.',
      },
      {
        title: 'Coloring Services',
        description: 'Full color, highlights, balayage, and root touch-ups for all hair types.',
      },
      {
        title: 'Styling',
        description: 'Blowouts, updos, and custom styling to suit any occasion.',
      },
    ];
  }

}