export interface Order {
  id: string;

  order_number: string;

  customer_id: string;

  plan_id: string;

  promo_code_id: string | null;

  original_price: number;

  discount_amount: number;

  final_price: number;

  currency: string;

  payment_method: string;

  payment_status: string;

  order_status: string;

  license_id: string | null;

  created_at?: string;

  updated_at?: string;

  customers?: {
    name: string;
    email: string;
  };

  plans?: {
    name: string;
  };

  promo_codes?: {
    code: string;
  };
}