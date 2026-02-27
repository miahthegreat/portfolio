export interface Service {
  id: string;
  name: string;
  description: string | null;
  category: string;
  priceCents: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  serviceId: string;
  quantity: number;
  priceCents: number;
  service?: { id: string; name: string; category: string };
}

export interface Order {
  id: string;
  residentId: string;
  createdAt: string;
  resident?: { id: string; name: string; email: string };
  items: OrderItem[];
  totalCents?: number;
}
