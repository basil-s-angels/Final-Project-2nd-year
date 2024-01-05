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
  total: number;
  this_month_revenue: number;
  last_month_revenue: number;
  invoices_today: number;
  invoices_yesterday: number;
}

export interface OrderCardProps {
  lineItems: LineItem[];
}
