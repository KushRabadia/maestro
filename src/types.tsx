export interface User {
  _id: string;
  email: string;
  name: string;
  courses: string[];
  token: string;
}

export interface Course {
  _id: string;
  imageUrl: string;
  title: string;
  author: string;
  playlistId: string;
  description: string;
  featured?: boolean;
}

export interface Storage {
  token: string | null;
  expiryDate: string | null;
}
