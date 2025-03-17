import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService, Post } from './posts.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PostsService],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error = '';

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 10); // Get first 10 posts
        this.loading = false;
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.loading = false;
      }
    });
  }
}