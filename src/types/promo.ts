export interface Promo {
  id: string;

  code: string;

  name: string;

  description: string | null;

  plan_id: string;

  promo_type: "free_plan" | "percentage" | "fixed";

  discount_value: number;

  max_uses: number;

  used_count: number;

  per_user_limit: number;

  is_public: boolean;

  expires_at: string | null;

  status: "active" | "inactive";

  created_at: string;

  updated_at: string;

  plans?: {
    id: string;
    name: string;
  };
}