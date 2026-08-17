export type ViewPage = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'checkout' 
  | 'about' 
  | 'contact' 
  | 'blogs' 
  | 'blog-detail' 
  | 'admin' 
  | 'auth'
  | 'manager-auth'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'ethical-sourcing';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription?: string;
  specs: Record<string, string>;
  rating: number;
  reviewCount: number;
  images: string[];
  isFeatured: boolean;
  sequenceOrder: number; // Position for featured display
  stock: number;
  inStock: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isChecked: boolean; // Smart selective checkbox system
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  shippingAddress: string;
  city: string;
  orderNotes?: string;
  paymentMethod: 'Cash on Delivery' | 'Credit/Debit Card (Demo)' | 'Bank Transfer (Demo)';
  items: OrderItem[];
  totalAmount: number;
  orderDate: string;
  status: OrderStatus;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Read' | 'Resolved';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  recommendedProductIds: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface UserAuth {
  isAuthenticated: boolean;
  isDemoMode: boolean;
  user: {
    name: string;
    email: string;
    role: 'customer' | 'admin';
  } | null;
}
