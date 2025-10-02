export interface BalanceAmount {
  amount: number;
  currency: string;
  source_types?: Record<string, number>;
}

export interface StripeBalance {
  available: BalanceAmount[];
  pending: BalanceAmount[];
  connect_reserved?: BalanceAmount[];
}

export interface StripeTransaction {
  id: string;
  amount: number;
  available_on: number;
  created: number;
  currency: string;
  description: string | null;
  fee: number;
  fee_details: Array<{
    amount: number;
    application: string | null;
    currency: string;
    description: string | null;
    type: string;
  }>;
  net: number;
  status: string;
  type: string;
  source: string | null;
  reporting_category: string;
  // Additional customer and product details
  customer_email: string | null;
  customer_name: string | null;
  product_names: string[] | null;
  charge_id: string | null;
}

export interface StripeTransactionsResponse {
  data: StripeTransaction[];
  has_more: boolean;
  next_starting_after?: string;
}

export interface StripeApiResponse {
  balance: StripeBalance;
  transactions: StripeTransactionsResponse;
}
