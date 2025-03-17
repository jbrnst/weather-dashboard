import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhotoMasterDetailComponent } from '../photo-album/photo-album.component';

@Component({
  selector: 'app-detail-component',
  standalone: true,
  imports: [CommonModule, RouterModule, PhotoMasterDetailComponent],
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.css']
})
export class DetailComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}