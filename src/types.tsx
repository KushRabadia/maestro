export interface User {
  _id: string;
  email: string;
  name: string;
  courses: string[];
  token: string;
}

export interface Storage {
  token: string | null;
  expiryDate: string | null;
}
