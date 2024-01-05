export interface User {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  email: string;
  hashed_password: string;
}

export interface UserJWT {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  position: string;
}

export interface LineItem {
  id: number;
  created_at: string;
  status: string;
  comment: string;
  table_num: number;
  name: string;
  quantity: number;
  price: string;
  date_format: string;
}
