import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostImage } from '../../models/post-image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  selectedImage: BehaviorSubject<PostImage> = new BehaviorSubject<PostImage>({
    id: '',
    fileName: '',
    fileExtension: '',
    title: '',
    url: '',
  });

  constructor(private http: HttpClient) {}

  getAllImages(): Observable<PostImage[]> {
    return this.http.get<PostImage[]>(`${environment.apiBaseUrl}/api/images`);
  }

  uploadImage(
    file: File,
    fileName: string,
    title: string
  ): Observable<PostImage> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<PostImage>(
      `${environment.apiBaseUrl}/api/images`,
      formData
    );
  }

  selectImage(image: PostImage): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<PostImage> {
    return this.selectedImage.asObservable();
  }
}
