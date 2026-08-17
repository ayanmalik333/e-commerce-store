import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, Inquiry, BlogPost, UserAuth, ViewPage } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BLOGS, INITIAL_ORDERS, INITIAL_INQUIRIES } from '../data/initialData';

interface DirectBuyItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  // Navigation State
  currentPage: ViewPage;
  setCurrentPage: (page: ViewPage) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedBlogSlug: string | null;
  setSelectedBlogSlug: (slug: string | null) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Auth State
  auth: UserAuth;
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  continueDemoMode: (role?: 'customer' | 'admin') => void;
  toggleUserRole: () => void;

  // Cart State (Smart Selective Checkbox System)
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleCartItemCheck: (productId: string) => void;
  toggleAllCartItemsCheck: (checked: boolean) => void;
  clearCheckedCartItems: () => void;
  getCheckedCartItems: () => CartItem[];
  getCheckedTotal: () => number;
  getCheckedItemCount: () => number;
  getTotalCartItemsCount: () => number;

  // Direct Buy Flow ("Buy Now")
  directBuyItem: DirectBuyItem | null;
  setDirectBuyItem: (item: DirectBuyItem | null) => void;
  triggerBuyNow: (product: Product, quantity?: number) => void;

  // Products CRUD (Admin & Catalog)
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProductSequence: (productId: string, newSequenceOrder: number) => void;
  resetProductsToDefault: () => void;

  // Categories CRUD
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;

  // Orders Management
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderDate' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  exportOrdersToCSV: () => void;

  // Inquiries Management
  inquiries: Inquiry[];
  submitInquiry: (inquiryData: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  deleteInquiry: (id: string) => void;
  exportInquiriesToCSV: () => void;

  // Blogs
  blogs: BlogPost[];
  addBlog: (blogData: Omit<BlogPost, 'id' | 'date'>) => void;
  updateBlog: (blog: BlogPost) => void;
  deleteBlog: (id: string) => void;

  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- Navigation State ---
  const [currentPage, setCurrentPage] = useState<ViewPage>('auth'); // Defaults to Auth Gate
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // --- Toast State ---
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // --- URL Query Parameter Handler (Direct Product Link Handling) ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const prodId = params.get('product');
      if (prodId) {
        setSelectedProductId(prodId);
        setCurrentPage('product-detail');
      }
    }
  }, []);

  // --- Auth State ---
  const [auth, setAuth] = useState<UserAuth>(() => {
    const saved = localStorage.getItem('terra_auth');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      isAuthenticated: false,
      isDemoMode: false,
      user: null
    };
  });

  useEffect(() => {
    localStorage.setItem('terra_auth', JSON.stringify(auth));
  }, [auth]);

  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const name = email.split('@')[0] || 'Valued Guest';
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    setAuth({
      isAuthenticated: true,
      isDemoMode: false,
      user: {
        name: capitalizedName,
        email,
        role
      }
    });
    setCurrentPage('home');
    showToast(`Welcome back, ${capitalizedName}!`);
  };

  const continueDemoMode = (role: 'customer' | 'admin' = 'customer') => {
    setAuth({
      isAuthenticated: true,
      isDemoMode: true,
      user: {
        name: role === 'admin' ? 'Demo Admin' : 'Demo Customer',
        email: role === 'admin' ? 'admin@terra-linen.com' : 'demo@terra-linen.com',
        role
      }
    });
    setCurrentPage(role === 'admin' ? 'admin' : 'home');
    showToast(`Entered Demo Mode as ${role === 'admin' ? 'Admin' : 'Customer'}`);
  };

  const toggleUserRole = () => {
    setAuth(prev => {
      if (!prev.user) return prev;
      const newRole = prev.user.role === 'admin' ? 'customer' : 'admin';
      const updated = {
        ...prev,
        user: { ...prev.user, role: newRole as 'customer' | 'admin' }
      };
      if (newRole === 'admin') {
        setCurrentPage('admin');
        showToast('Switched to Admin Manager View');
      } else {
        setCurrentPage('home');
        showToast('Switched to Customer Store View');
      }
      return updated;
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      isDemoMode: false,
      user: null
    });
    setCurrentPage('auth');
    showToast('Logged out successfully');
  };

  // --- Products State ---
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('terra_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('terra_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" created successfully`);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    showToast(`Product "${updatedProduct.name}" updated`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted');
  };

  const updateProductSequence = (productId: string, newSequenceOrder: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, sequenceOrder: newSequenceOrder, isFeatured: true };
      }
      return p;
    }));
    showToast('Featured sequence order updated');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('terra_products');
    showToast('Reset catalog to default artisanal collection');
  };

  // --- Categories State ---
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('terra_categories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('terra_categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCat]);
    showToast(`Category "${newCat.name}" added`);
  };

  const updateCategory = (updatedCat: Category) => {
    setCategories(prev => prev.map(c => c.id === updatedCat.id ? updatedCat : c));
    showToast(`Category "${updatedCat.name}" updated`);
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Category removed');
  };

  // --- Cart State (Smart Selective Checkbox System) ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('terra_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('terra_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, openDrawer = true) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          isChecked: true // Auto check newly added or updated item
        };
        return updated;
      } else {
        return [...prev, { product, quantity, isChecked: true }];
      }
    });
    showToast(`Saved "${product.name}" to Cart`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const toggleCartItemCheck = (productId: string) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, isChecked: !item.isChecked } : item));
  };

  const toggleAllCartItemsCheck = (checked: boolean) => {
    setCart(prev => prev.map(item => ({ ...item, isChecked: checked })));
  };

  const clearCheckedCartItems = () => {
    setCart(prev => prev.filter(item => !item.isChecked));
  };

  const getCheckedCartItems = () => {
    return cart.filter(item => item.isChecked);
  };

  const getCheckedTotal = () => {
    return cart
      .filter(item => item.isChecked)
      .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const getCheckedItemCount = () => {
    return cart
      .filter(item => item.isChecked)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalCartItemsCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // --- Direct Buy Flow ("Buy Now") ---
  const [directBuyItem, setDirectBuyItem] = useState<DirectBuyItem | null>(null);

  const triggerBuyNow = (product: Product, quantity = 1) => {
    setDirectBuyItem({ product, quantity });
    setCurrentPage('checkout');
    setIsCartOpen(false);
  };

  // --- Orders Management ---
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('terra_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('terra_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData: Omit<Order, 'id' | 'orderDate' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      orderDate: formattedDate,
      status: 'Pending'
    };

    setOrders(prev => [newOrder, ...prev]);

    // If order came from cart checked items, remove them from cart
    if (!directBuyItem) {
      clearCheckedCartItems();
    } else {
      setDirectBuyItem(null);
    }

    showToast(`Order ${newOrder.id} confirmed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order ${orderId} status set to ${status}`);
  };

  const exportOrdersToCSV = () => {
    if (orders.length === 0) {
      showToast('No orders available to export.');
      return;
    }

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://terra-linen.com';

    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Phone',
      'Email',
      'Shipping Address',
      'City',
      'Payment Method',
      'Items Count',
      'Product Links',
      'Ordered Items',
      'Total Amount ($)',
      'Status',
      'Order Notes'
    ];

    const rows = orders.map(o => {
      // Format Product Links Column:
      // Single product > 1 qty: "1. (product link) x2"
      // Multiple products: "1. (product link) 2. (product link)" or "1. (product link) x2 2. (product link)"
      const productLinksFormatted = o.items.map((item, idx) => {
        const productUrl = `${baseUrl}/?product=${item.productId}`;
        const qtySuffix = item.quantity > 1 ? ` x${item.quantity}` : '';
        return `${idx + 1}. ${productUrl}${qtySuffix}`;
      }).join(' ');

      // Format Ordered Items Column with names & quantities:
      const itemNamesFormatted = o.items.map((item, idx) => {
        const qtySuffix = item.quantity > 1 ? ` x${item.quantity}` : '';
        return `${idx + 1}. ${item.productName}${qtySuffix}`;
      }).join(' ');

      return [
        `"${o.id}"`,
        `"${o.orderDate}"`,
        `"${o.customerName.replace(/"/g, '""')}"`,
        `"${o.phone}"`,
        `"${(o.email || '').replace(/"/g, '""')}"`,
        `"${o.shippingAddress.replace(/"/g, '""')}"`,
        `"${o.city.replace(/"/g, '""')}"`,
        `"${o.paymentMethod}"`,
        o.items.reduce((acc, i) => acc + i.quantity, 0),
        `"${productLinksFormatted.replace(/"/g, '""')}"`,
        `"${itemNamesFormatted.replace(/"/g, '""')}"`,
        o.totalAmount,
        `"${o.status}"`,
        `"${(o.orderNotes || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `terra_linen_orders_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders with product links exported to CSV file');
  };

  // --- Inquiries Management ---
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('terra_inquiries');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_INQUIRIES;
  });

  useEffect(() => {
    localStorage.setItem('terra_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const submitInquiry = (inquiryData: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      date: formattedDate,
      status: 'Unread'
    };

    setInquiries(prev => [newInquiry, ...prev]);
    showToast('Your inquiry has been submitted. Our concierge will respond shortly.');
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    showToast('Inquiry removed');
  };

  const exportInquiriesToCSV = () => {
    if (inquiries.length === 0) {
      showToast('No inquiries available to export.');
      return;
    }
    const headers = ['Inquiry ID', 'Date', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status'];
    const rows = inquiries.map(i => [
      `"${i.id}"`,
      `"${i.date}"`,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email.replace(/"/g, '""')}"`,
      `"${i.phone.replace(/"/g, '""')}"`,
      `"${i.subject.replace(/"/g, '""')}"`,
      `"${i.message.replace(/"/g, '""')}"`,
      `"${i.status}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `terra_linen_inquiries_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Inquiries exported to CSV file');
  };

  // --- Blogs Management ---
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('terra_blogs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_BLOGS;
  });

  useEffect(() => {
    localStorage.setItem('terra_blogs', JSON.stringify(blogs));
  }, [blogs]);

  const addBlog = (blogData: Omit<BlogPost, 'id' | 'date'>) => {
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    // Clean slug format
    let formattedSlug = blogData.slug.trim();
    if (formattedSlug.startsWith('/blogs/')) {
      formattedSlug = formattedSlug.replace('/blogs/', '');
    } else if (formattedSlug.startsWith('/')) {
      formattedSlug = formattedSlug.replace('/', '');
    }
    if (!formattedSlug) {
      formattedSlug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const newBlog: BlogPost = {
      ...blogData,
      id: `blog-${Date.now()}`,
      slug: formattedSlug,
      date: formattedDate
    };

    setBlogs(prev => [newBlog, ...prev]);
    showToast(`Blog post "${newBlog.title}" published!`);
  };

  const updateBlog = (updatedBlog: BlogPost) => {
    let formattedSlug = updatedBlog.slug.trim();
    if (formattedSlug.startsWith('/blogs/')) {
      formattedSlug = formattedSlug.replace('/blogs/', '');
    } else if (formattedSlug.startsWith('/')) {
      formattedSlug = formattedSlug.replace('/', '');
    }

    const finalBlog = { ...updatedBlog, slug: formattedSlug };
    setBlogs(prev => prev.map(b => b.id === finalBlog.id ? finalBlog : b));
    showToast(`Blog post "${finalBlog.title}" updated`);
  };

  const deleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    showToast('Blog post deleted');
  };

  return (
    <StoreContext.Provider value={{
      currentPage, setCurrentPage,
      selectedProductId, setSelectedProductId,
      selectedBlogSlug, setSelectedBlogSlug,
      selectedCategorySlug, setSelectedCategorySlug,
      searchQuery, setSearchQuery,
      auth, login, logout, continueDemoMode, toggleUserRole,
      cart, isCartOpen, setIsCartOpen,
      addToCart, removeFromCart, updateCartQuantity,
      toggleCartItemCheck, toggleAllCartItemsCheck, clearCheckedCartItems,
      getCheckedCartItems, getCheckedTotal, getCheckedItemCount, getTotalCartItemsCount,
      directBuyItem, setDirectBuyItem, triggerBuyNow,
      products, addProduct, updateProduct, deleteProduct, updateProductSequence, resetProductsToDefault,
      categories, addCategory, updateCategory, deleteCategory,
      orders, placeOrder, updateOrderStatus, exportOrdersToCSV,
      inquiries, submitInquiry, deleteInquiry, exportInquiriesToCSV,
      blogs, addBlog, updateBlog, deleteBlog,
      toastMessage, showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
