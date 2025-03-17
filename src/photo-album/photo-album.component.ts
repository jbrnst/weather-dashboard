import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Photo {
  url: string;
  alt: string;
}

@Component({
  standalone:true,
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.css'],
  imports: [CommonModule],
})
export class PhotoMasterDetailComponent {
  photos: Photo[] = [
    { url: 'assets/daniel-doing-hair.jpg', alt: 'Photo 1' },
    { url: 'assets/stripe-suit-resize.jpg', alt: 'Photo 2' },
    { url: 'assets/child-haircut-male.jpg', alt: 'Photo 3' },
    { url: 'assets/man-undercut.jpg', alt: 'Photo 3' }
    // Add more photos as needed
  ];

  selectedPhoto: Photo | null = this.photos[0];

  selectPhoto(photo: Photo): void {
    this.selectedPhoto = photo;
  }
}
