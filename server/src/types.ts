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
