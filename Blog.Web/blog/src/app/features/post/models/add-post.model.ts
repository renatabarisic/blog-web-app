export interface AddPost {
  title: string;
  shortDescription: string;
  content: string;
  imageUrl: string;
  urlHandle: string;
  author: string;
  publishedDate: Date;
  isVisible: boolean;
  categories: string[];
}
