export interface Customer {
  id: string;

  name: string;

  email: string;

  email_verified: boolean;

  status: "active" | "inactive";

  created_at: string;

  updated_at: string;
}