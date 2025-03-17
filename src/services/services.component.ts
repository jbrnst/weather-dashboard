import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SalonServicesService } from '../salon-services.service';

@Component({
  selector: 'app-services',
  standalone: true,
  providers: [SalonServicesService],
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: { title: string; description: string }[] = [];

  constructor(
    private salonServices: SalonServicesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.services = this.salonServices.getServices();
  }

  viewStylists(service: string) {
    this.router.navigate(['/stylists', service]);
  }
}