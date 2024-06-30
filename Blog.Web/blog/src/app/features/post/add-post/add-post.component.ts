import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddPost } from '../models/add-post.model';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-upload/image.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit, OnDestroy {
  model: AddPost;
  categories$?: Observable<Category[]>;
  isImageModalVisible: boolean = false;
  imageSelectSubscription?: Subscription;

  constructor(
    private postService: PostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      imageUrl: '',
      author: '',
      publishedDate: new Date(),
      isVisible: true,
      categories: [],
    };
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (selectedImage) => {
        this.model.imageUrl = selectedImage.url;
        this.closeImageModal();
      },
    });
  }

  onFormSubmit(): void {
    this.postService.createPost(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/posts');
      },
    });
  }

  openImageModal(): void {
    this.isImageModalVisible = true;
  }

  closeImageModal(): void {
    this.isImageModalVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectSubscription?.unsubscribe();
  }
}
