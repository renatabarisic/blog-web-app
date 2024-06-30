import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryGridComponent } from './features/category/category-grid/category-grid.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { PostGridComponent } from './features/post/post-grid/post-grid.component';
import { AddPostComponent } from './features/post/add-post/add-post.component';
import { EditPostComponent } from './features/post/edit-post/edit-post.component';
import { HomeComponent } from './features/public/home/home.component';
import { PostDetailsComponent } from './features/public/post-details/post-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { RegisterComponent } from './features/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'post/:url',
    component: PostDetailsComponent,
  },
  {
    path: 'admin/categories',
    component: CategoryGridComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/posts',
    component: PostGridComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/posts/add',
    component: AddPostComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/posts/:id',
    component: EditPostComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
