import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Method to check if the link is active
  isActive(route: string): boolean {
    return this.router.url === route; // Check if the current URL matches the route
  }
}
