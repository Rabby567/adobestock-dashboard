export interface Plan {

  id: string;

  name: string;

  duration_days: number | null;

  price: number;

  status: string;

  created_at?: string;

  updated_at?: string;

}