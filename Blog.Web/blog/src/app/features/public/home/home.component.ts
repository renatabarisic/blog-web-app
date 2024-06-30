import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post/services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../post/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts$?: Observable<Post[]>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getAllPosts();
  }
}
