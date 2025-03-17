import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StylistsService } from '../stylists.service';

@Component({
  selector: 'app-browse-stylists',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './browse-stylists.component.html',
  styleUrls: ['./browse-stylists.component.css']
})
export class BroweStylistsComponent implements OnInit {
  stylists: any[] = [];
  selectedStylist: any = null;
  serviceType: string = '';

  constructor(
    private stylistsService: StylistsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serviceType = params['service'];
      this.stylists = this.stylistsService.getStylistsByService(this.serviceType);
      if (this.stylists.length > 0) {
        this.selectedStylist = this.stylists[0];
      }
    });
  }

  selectStylist(stylist: any) {
    this.selectedStylist = stylist;
  }

  backToServices() {
    this.router.navigate(['/services']);
  }
}