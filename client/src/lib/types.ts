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
  table_id: number;
  name: string;
  quantity: number;
  price: string;
  code: string;
}

export interface OrderCardProps {
  lineItems: LineItem[];
  tableNumber: number;
}
