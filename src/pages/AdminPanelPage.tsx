import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Category, OrderStatus, BlogPost } from '../types';
import {
  Shield, Download, Plus, Trash2, Edit3, ArrowUpDown,
  PackageCheck, MessageSquare, Tag, FileSpreadsheet,
  Check, X, RefreshCcw, DollarSign, ShoppingBag, Eye, Star,
  FileText, Globe, Upload, BookOpen, Code, Search
} from 'lucide-react';

export const AdminPanelPage: React.FC = () => {
  const {
    products, addProduct, updateProduct, deleteProduct, updateProductSequence, resetProductsToDefault,
    categories, addCategory, updateCategory, deleteCategory,
    orders, updateOrderStatus, exportOrdersToCSV,
    inquiries, deleteInquiry, exportInquiriesToCSV,
    blogs, addBlog, updateBlog, deleteBlog, setSelectedBlogSlug, setSelectedProductId, setCurrentPage, showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'inquiries' | 'blogs'>('products');

  // Product Form Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState(categories[0]?.name || 'Ceramics & Stoneware');
  const [prodPrice, setProdPrice] = useState('85');
  const [prodOrigPrice, setProdOrigPrice] = useState('100');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodIsFeatured, setProdIsFeatured] = useState(true);
  const [prodSequence, setProdSequence] = useState('1');
  const [prodStock, setProdStock] = useState('20');

  // Blog Form Modal State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const [blogTitle, setBlogTitle] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogMetaTitle, setBlogMetaTitle] = useState('');
  const [blogMetaDescription, setBlogMetaDescription] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('Interior & Design');
  const [blogAuthor, setBlogAuthor] = useState('Evelyn Vane, Creative Director');
  const [blogImage, setBlogImage] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogReadTime, setBlogReadTime] = useState('4 min read');
  const [uploadedHtmlFileName, setUploadedHtmlFileName] = useState('');

  // Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImage, setNewCatImage] = useState('');

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory(categories[0]?.name || 'Ceramics & Stoneware');
    setProdPrice('85');
    setProdOrigPrice('100');
    setProdDesc('Handcrafted artisanal product.');
    setProdImage('https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80');
    setProdIsFeatured(true);
    setProdSequence(String(products.length + 1));
    setProdStock('15');
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdPrice(String(p.price));
    setProdOrigPrice(p.originalPrice ? String(p.originalPrice) : '');
    setProdDesc(p.description);
    setProdImage(p.images[0] || '');
    setProdIsFeatured(p.isFeatured);
    setProdSequence(String(p.sequenceOrder || 99));
    setProdStock(String(p.stock));
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice) return;

    const parsedPrice = parseFloat(prodPrice) || 0;
    const parsedOrigPrice = prodOrigPrice ? parseFloat(prodOrigPrice) : undefined;
    const parsedSeq = parseInt(prodSequence) || 99;
    const parsedStock = parseInt(prodStock) || 10;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName,
        category: prodCategory,
        price: parsedPrice,
        originalPrice: parsedOrigPrice,
        description: prodDesc,
        images: [prodImage || editingProduct.images[0]],
        isFeatured: prodIsFeatured,
        sequenceOrder: parsedSeq,
        stock: parsedStock,
        inStock: parsedStock > 0
      });
    } else {
      addProduct({
        name: prodName,
        category: prodCategory,
        price: parsedPrice,
        originalPrice: parsedOrigPrice,
        description: prodDesc,
        specs: {
          'Origin': 'Artisanal Studio',
          'Material': 'Natural Fibers / Terra Clay',
          'Care': 'Gentle Care'
        },
        rating: 5.0,
        reviewCount: 1,
        images: [prodImage || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80'],
        isFeatured: prodIsFeatured,
        sequenceOrder: parsedSeq,
        stock: parsedStock,
        inStock: parsedStock > 0
      });
    }

    setIsProductModalOpen(false);
  };

  // Blog Handlers
  const openNewBlogModal = () => {
    setEditingBlog(null);
    setBlogTitle('');
    setBlogSlug('/blogs/my-new-article');
    setBlogMetaTitle('My New Article | Terra & Linen');
    setBlogMetaDescription('Discover our latest artisanal journal entry on natural materials and earthy interior design.');
    setBlogContent('<h1>My New Article Title</h1>\n<p>Write your blog post content here or upload a raw .html file above.</p>');
    setBlogCategory('Interior & Design');
    setBlogAuthor('Evelyn Vane, Creative Director');
    setBlogImage('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80');
    setBlogExcerpt('Discover our latest artisanal journal entry on natural materials and earthy interior design.');
    setBlogReadTime('4 min read');
    setUploadedHtmlFileName('');
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (b: BlogPost) => {
    setEditingBlog(b);
    setBlogTitle(b.title);
    setBlogSlug(b.slug.startsWith('/blogs/') ? b.slug : `/blogs/${b.slug}`);
    setBlogMetaTitle(b.metaTitle || `${b.title} | Terra & Linen`);
    setBlogMetaDescription(b.metaDescription || b.excerpt);
    setBlogContent(b.content);
    setBlogCategory(b.category);
    setBlogAuthor(b.author);
    setBlogImage(b.image);
    setBlogExcerpt(b.excerpt);
    setBlogReadTime(b.readTime);
    setUploadedHtmlFileName(b.content.includes('<') ? 'Existing Markup Loaded' : '');
    setIsBlogModalOpen(true);
  };

  const handleHtmlFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedHtmlFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawHtml = event.target?.result as string;
        if (rawHtml) {
          setBlogContent(rawHtml);
          showToast(`HTML file "${file.name}" uploaded successfully!`);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogSlug) return;

    // Sanitize/clean slug
    let cleanSlug = blogSlug.trim();
    if (cleanSlug.startsWith('/blogs/')) {
      cleanSlug = cleanSlug.replace('/blogs/', '');
    } else if (cleanSlug.startsWith('/')) {
      cleanSlug = cleanSlug.replace('/', '');
    }

    if (editingBlog) {
      updateBlog({
        ...editingBlog,
        title: blogTitle,
        slug: cleanSlug,
        metaTitle: blogMetaTitle,
        metaDescription: blogMetaDescription,
        content: blogContent,
        category: blogCategory,
        author: blogAuthor,
        image: blogImage || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        excerpt: blogExcerpt || blogMetaDescription,
        readTime: blogReadTime,
      });
    } else {
      addBlog({
        title: blogTitle,
        slug: cleanSlug,
        metaTitle: blogMetaTitle,
        metaDescription: blogMetaDescription,
        content: blogContent,
        category: blogCategory,
        author: blogAuthor,
        image: blogImage || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        excerpt: blogExcerpt || blogMetaDescription,
        readTime: blogReadTime,
        recommendedProductIds: ['prod-1', 'prod-2', 'prod-3']
      });
    }

    setIsBlogModalOpen(false);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    addCategory({
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      description: newCatDesc || 'Artisanal collection.',
      image: newCatImage || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      itemCount: 0
    });
    setNewCatName('');
    setNewCatDesc('');
    setNewCatImage('');
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Metrics */}
      <div className="bg-[#2C221E] text-[#FDFBF7] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#2C221E]/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E0D8]/15 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#5B6B54]/30 rounded-2xl text-[#A2B899]">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A2B899]">
                Backend Side Manager
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold">
                Atelier Store Operations Dashboard
              </h1>
            </div>
          </div>

          <button
            id="admin-reset-catalog-btn"
            onClick={resetProductsToDefault}
            className="px-4 py-2.5 bg-[#5B6B54]/30 hover:bg-[#5B6B54] text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer border border-[#5B6B54]/40"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Catalog</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-[#FDFBF7]/5 rounded-2xl border border-[#E6E0D8]/10 space-y-1">
            <span className="text-[#E6E0D8]/60 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-[#A2B899]" /> Total Sales Volume
            </span>
            <span className="font-serif text-2xl font-bold text-[#FDFBF7] block">
              ${totalRevenue.toFixed(2)}
            </span>
          </div>

          <div className="p-4 bg-[#FDFBF7]/5 rounded-2xl border border-[#E6E0D8]/10 space-y-1">
            <span className="text-[#E6E0D8]/60 flex items-center gap-1">
              <PackageCheck className="w-3.5 h-3.5 text-[#A2B899]" /> Total Orders
            </span>
            <span className="font-serif text-2xl font-bold text-[#FDFBF7] block">
              {orders.length} orders
            </span>
          </div>

          <div className="p-4 bg-[#FDFBF7]/5 rounded-2xl border border-[#E6E0D8]/10 space-y-1">
            <span className="text-[#E6E0D8]/60 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#A2B899]" /> Client Inquiries
            </span>
            <span className="font-serif text-2xl font-bold text-[#FDFBF7] block">
              {inquiries.length} leads
            </span>
          </div>

          <div className="p-4 bg-[#FDFBF7]/5 rounded-2xl border border-[#E6E0D8]/10 space-y-1">
            <span className="text-[#E6E0D8]/60 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#A2B899]" /> Active Products
            </span>
            <span className="font-serif text-2xl font-bold text-[#FDFBF7] block">
              {products.length} items
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#E6E0D8] pb-1 overflow-x-auto text-xs font-semibold">
        <button
          id="admin-tab-products"
          onClick={() => setActiveTab('products')}
          className={`px-5 py-3 rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-[#F7F4EE] text-[#2C221E] border-t-2 border-[#5B6B54]'
              : 'text-[#8C827A] hover:text-[#2C221E]'
          }`}
        >
          <Tag className="w-4 h-4 text-[#5B6B54]" />
          <span>Product & Featured Sequence Manager ({products.length})</span>
        </button>

        <button
          id="admin-tab-orders"
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#F7F4EE] text-[#2C221E] border-t-2 border-[#5B6B54]'
              : 'text-[#8C827A] hover:text-[#2C221E]'
          }`}
        >
          <PackageCheck className="w-4 h-4 text-[#5B6B54]" />
          <span>Orders Manager ({orders.length})</span>
        </button>

        <button
          id="admin-tab-inquiries"
          onClick={() => setActiveTab('inquiries')}
          className={`px-5 py-3 rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'inquiries'
              ? 'bg-[#F7F4EE] text-[#2C221E] border-t-2 border-[#5B6B54]'
              : 'text-[#8C827A] hover:text-[#2C221E]'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-[#5B6B54]" />
          <span>Inquiries Lead Manager ({inquiries.length})</span>
        </button>

        <button
          id="admin-tab-categories"
          onClick={() => setActiveTab('categories')}
          className={`px-5 py-3 rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'bg-[#F7F4EE] text-[#2C221E] border-t-2 border-[#5B6B54]'
              : 'text-[#8C827A] hover:text-[#2C221E]'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-[#5B6B54]" />
          <span>Categories ({categories.length})</span>
        </button>

        <button
          id="admin-tab-blogs"
          onClick={() => setActiveTab('blogs')}
          className={`px-5 py-3 rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'blogs'
              ? 'bg-[#F7F4EE] text-[#2C221E] border-t-2 border-[#5B6B54]'
              : 'text-[#8C827A] hover:text-[#2C221E]'
          }`}
        >
          <Globe className="w-4 h-4 text-[#5B6B54]" />
          <span>Blog & SEO Manager ({blogs.length})</span>
        </button>
      </div>

      {/* TAB 1: PRODUCT & SEQUENCE MANAGER */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F7F4EE] p-5 rounded-2xl border border-[#E6E0D8]">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C221E]">
                Catalog CRUD & Hero Featured Priority Control
              </h3>
              <p className="text-xs text-[#8C827A]">
                Adjust position sequence numbers (e.g. 1 to 5) to dynamically order top ranked products displayed on the Home Page hero section!
              </p>
            </div>

            <button
              id="admin-add-product-btn"
              onClick={openNewProductModal}
              className="px-5 py-2.5 bg-[#2C221E] hover:bg-[#5B6B54] text-[#FDFBF7] text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#F7F4EE] rounded-3xl border border-[#E6E0D8] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#E6E0D8]/60 text-[#2C221E] font-serif font-bold uppercase tracking-wider">
                    <th className="p-4">Hero Pos (#)</th>
                    <th className="p-4">Product Info</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Featured Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E0D8]">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-[#FDFBF7] transition-colors">
                      {/* Hero Position Sequence Input */}
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <input
                            id={`seq-input-${p.id}`}
                            type="number"
                            min="1"
                            max="99"
                            value={p.sequenceOrder || 99}
                            onChange={(e) => updateProductSequence(p.id, parseInt(e.target.value) || 99)}
                            className="w-14 px-2 py-1 text-xs font-bold text-[#2C221E] bg-[#FDFBF7] border border-[#E6E0D8] rounded-lg text-center"
                          />
                        </div>
                      </td>

                      {/* Product Info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-lg border border-[#E6E0D8]"
                          />
                          <div>
                            <span className="font-serif font-bold text-sm text-[#2C221E] block">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-[#8C827A] line-clamp-1">
                              {p.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-medium text-[#2C221E]">{p.category}</td>

                      <td className="p-4 font-bold text-[#2C221E]">
                        ${p.price.toFixed(2)}
                        {p.originalPrice && (
                          <span className="text-[10px] text-[#8C827A] line-through block font-normal">
                            ${p.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </td>

                      <td className="p-4 font-semibold text-[#5B6B54]">{p.stock} units</td>

                      <td className="p-4">
                        <button
                          id={`toggle-featured-${p.id}`}
                          onClick={() => updateProduct({ ...p, isFeatured: !p.isFeatured })}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                            p.isFeatured
                              ? 'bg-[#5B6B54] text-white'
                              : 'bg-[#E6E0D8] text-[#8C827A]'
                          }`}
                        >
                          {p.isFeatured ? 'Top Featured' : 'Standard Catalog'}
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            id={`edit-prod-${p.id}`}
                            onClick={() => openEditProductModal(p)}
                            className="p-1.5 bg-[#FDFBF7] border border-[#E6E0D8] hover:bg-[#2C221E] hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            id={`delete-prod-${p.id}`}
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 bg-[#FDFBF7] border border-[#E6E0D8] hover:bg-red-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDER MANAGER */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F7F4EE] p-5 rounded-2xl border border-[#E6E0D8]">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C221E]">
                Buy Now & Cart Order Fulfillment Dashboard
              </h3>
              <p className="text-xs text-[#8C827A]">
                View customer details, shipping addresses, ordered items, and export order data to CSV for courier dispatch.
              </p>
            </div>

            {/* Prompt Section 4.B Requirement: Prominent "Export Orders to CSV" button */}
            <button
              id="export-orders-csv-btn"
              onClick={exportOrdersToCSV}
              className="px-6 py-3 bg-[#5B6B54] hover:bg-[#475442] text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Orders to CSV</span>
            </button>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="p-8 bg-[#F7F4EE] rounded-3xl text-center border border-[#E6E0D8] text-[#8C827A] text-xs">
                No orders placed yet. Place an order via Customer Checkout to see it here!
              </div>
            ) : (
              orders.map(order => (
                <div
                  key={order.id}
                  id={`order-card-${order.id}`}
                  className="bg-[#F7F4EE] p-6 rounded-3xl border border-[#E6E0D8] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E6E0D8]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#2C221E] bg-[#FDFBF7] px-3 py-1 rounded-lg border border-[#E6E0D8]">
                        {order.id}
                      </span>
                      <span className="text-xs text-[#8C827A]">{order.orderDate}</span>
                    </div>

                    {/* Order Status Select */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#8C827A]">Status:</span>
                      <select
                        id={`order-status-select-${order.id}`}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-[#FDFBF7] border border-[#E6E0D8] text-[#2C221E] font-semibold px-3 py-1.5 rounded-xl cursor-pointer focus:outline-none focus:border-[#5B6B54]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6E0D8]">
                    <div>
                      <span className="text-[#8C827A] block font-semibold">Customer Name:</span>
                      <strong className="text-[#2C221E] text-sm">{order.customerName}</strong>
                      <span className="text-[#8C827A] block mt-0.5">{order.phone}</span>
                    </div>

                    <div>
                      <span className="text-[#8C827A] block font-semibold">Shipping Address:</span>
                      <span className="text-[#2C221E]">{order.shippingAddress}, {order.city}</span>
                    </div>

                    <div>
                      <span className="text-[#8C827A] block font-semibold">Payment & Total:</span>
                      <span className="text-[#5B6B54] font-medium block">{order.paymentMethod}</span>
                      <strong className="font-serif text-lg font-bold text-[#2C221E]">
                        ${order.totalAmount.toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  {/* Ordered Items */}
                  <div className="space-y-2 pt-1 text-xs">
                    <span className="font-semibold text-[#2C221E] block">Ordered Items:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-[#FDFBF7] p-2.5 rounded-xl border border-[#E6E0D8]">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-10 h-10 object-cover rounded-lg border border-[#E6E0D8]"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-[#2C221E] truncate block">{item.productName}</span>
                            <div className="flex items-center justify-between text-[11px] text-[#8C827A] mt-0.5">
                              <span>{item.quantity}x @ ${item.price.toFixed(2)}</span>
                              <button
                                id={`view-order-product-${order.id}-${item.productId}`}
                                onClick={() => {
                                  setSelectedProductId(item.productId);
                                  setCurrentPage('product-detail');
                                }}
                                className="inline-flex items-center gap-1 text-[#5B6B54] hover:text-[#2C221E] font-medium cursor-pointer"
                                title="View Product Page"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Link</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.orderNotes && (
                    <div className="text-xs bg-[#E6E0D8]/40 p-3 rounded-xl text-[#2C221E]">
                      <strong>Notes:</strong> {order.orderNotes}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: INQUIRIES MANAGER */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F7F4EE] p-5 rounded-2xl border border-[#E6E0D8]">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C221E]">
                Contact Us Form Submissions Log
              </h3>
              <p className="text-xs text-[#8C827A]">
                View inquiries from clients and trade partners, delete leads, and export all submissions into a CSV file.
              </p>
            </div>

            {/* Prompt Section 4.C Requirement: Prominent "Export Inquiries to CSV" button */}
            <button
              id="export-inquiries-csv-btn"
              onClick={exportInquiriesToCSV}
              className="px-6 py-3 bg-[#5B6B54] hover:bg-[#475442] text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Inquiries to CSV</span>
            </button>
          </div>

          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="p-8 bg-[#F7F4EE] rounded-3xl text-center border border-[#E6E0D8] text-[#8C827A] text-xs">
                No inquiries submitted yet.
              </div>
            ) : (
              inquiries.map(inq => (
                <div
                  key={inq.id}
                  id={`inquiry-card-${inq.id}`}
                  className="bg-[#F7F4EE] p-6 rounded-3xl border border-[#E6E0D8] shadow-xs space-y-3"
                >
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-[#E6E0D8]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-[#2C221E] bg-[#FDFBF7] px-2.5 py-0.5 rounded border border-[#E6E0D8]">
                          {inq.id}
                        </span>
                        <span className="font-serif font-bold text-sm text-[#2C221E]">
                          {inq.subject}
                        </span>
                      </div>
                      <p className="text-xs text-[#8C827A]">
                        From: <strong className="text-[#2C221E]">{inq.name}</strong> ({inq.email} | {inq.phone}) • {inq.date}
                      </p>
                    </div>

                    <button
                      id={`delete-inquiry-${inq.id}`}
                      onClick={() => deleteInquiry(inq.id)}
                      className="p-2 text-[#8C827A] hover:text-red-700 hover:bg-[#E6E0D8]/40 rounded-lg transition-colors cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-[#2C221E] bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6E0D8] leading-relaxed font-light">
                    "{inq.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CATEGORIES MANAGER */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Category Form */}
          <div className="lg:col-span-5 bg-[#F7F4EE] p-6 rounded-3xl border border-[#E6E0D8] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2C221E] pb-2 border-b border-[#E6E0D8]">
              Add New Category
            </h3>
            <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Category Name *</label>
                <input
                  id="cat-name-input"
                  type="text"
                  required
                  placeholder="e.g. Glassware & Decanters"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Description</label>
                <textarea
                  id="cat-desc-textarea"
                  rows={2}
                  placeholder="Short description..."
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Image URL</label>
                <input
                  id="cat-image-input"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newCatImage}
                  onChange={(e) => setNewCatImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none"
                />
              </div>

              <button
                id="add-cat-submit-btn"
                type="submit"
                className="w-full py-2.5 bg-[#2C221E] text-[#FDFBF7] font-semibold rounded-xl hover:bg-[#5B6B54] transition-colors cursor-pointer"
              >
                Create Category
              </button>
            </form>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="bg-[#F7F4EE] p-4 rounded-2xl border border-[#E6E0D8] flex gap-3 items-center">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-16 h-16 object-cover rounded-xl border border-[#E6E0D8] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#2C221E]">{cat.name}</h4>
                    <p className="text-[11px] text-[#8C827A] line-clamp-2">{cat.description}</p>
                  </div>
                  <button
                    id={`delete-cat-${cat.id}`}
                    onClick={() => deleteCategory(cat.id)}
                    className="p-1.5 text-[#8C827A] hover:text-red-700 hover:bg-[#E6E0D8]/40 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BLOG & SEO MANAGER */}
      {activeTab === 'blogs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F7F4EE] p-5 rounded-2xl border border-[#E6E0D8]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-5 h-5 text-[#5B6B54]" />
                <h3 className="font-serif text-xl font-bold text-[#2C221E]">
                  Blog Articles & Search Console SEO Manager
                </h3>
              </div>
              <p className="text-xs text-[#8C827A]">
                Manage blog posts, upload raw formatted .html markup files, and set Meta Titles & Descriptions for Google Search Console indexing.
              </p>
            </div>

            <button
              id="admin-add-blog-btn"
              onClick={openNewBlogModal}
              className="px-5 py-2.5 bg-[#2C221E] hover:bg-[#5B6B54] text-[#FDFBF7] text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Article</span>
            </button>
          </div>

          {/* Blogs Table */}
          <div className="bg-[#F7F4EE] rounded-3xl border border-[#E6E0D8] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#E6E0D8]/60 text-[#2C221E] font-serif font-bold uppercase tracking-wider">
                    <th className="p-4">Article</th>
                    <th className="p-4">Custom URL Slug</th>
                    <th className="p-4">Meta Title (Search Console)</th>
                    <th className="p-4">Meta Description Snippet</th>
                    <th className="p-4">Format</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E0D8]">
                  {blogs.map(b => {
                    const hasHtml = b.content && b.content.includes('<') && b.content.includes('>');
                    const slugFormatted = b.slug.startsWith('/blogs/') ? b.slug : `/blogs/${b.slug}`;
                    return (
                      <tr key={b.id} className="hover:bg-[#FDFBF7] transition-colors">
                        {/* Article Info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={b.image}
                              alt={b.title}
                              className="w-12 h-12 object-cover rounded-xl border border-[#E6E0D8]"
                            />
                            <div>
                              <span className="font-serif font-bold text-sm text-[#2C221E] block">
                                {b.title}
                              </span>
                              <span className="text-[11px] text-[#8C827A]">
                                {b.category} • {b.date}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Custom URL Slug */}
                        <td className="p-4 font-mono text-[11px] text-[#5B6B54]">
                          {slugFormatted}
                        </td>

                        {/* Meta Title */}
                        <td className="p-4 font-medium text-[#2C221E] max-w-xs truncate">
                          {b.metaTitle || `${b.title} | Terra & Linen`}
                        </td>

                        {/* Meta Description */}
                        <td className="p-4 text-[#8C827A] max-w-xs line-clamp-2">
                          {b.metaDescription || b.excerpt}
                        </td>

                        {/* Format Badge */}
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            hasHtml ? 'bg-[#5B6B54]/20 text-[#5B6B54]' : 'bg-[#E6E0D8] text-[#8C827A]'
                          }`}>
                            {hasHtml ? 'Raw .HTML' : 'Markdown/Text'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              id={`preview-blog-${b.id}`}
                              onClick={() => {
                                setSelectedBlogSlug(b.slug);
                                setCurrentPage('blog-detail');
                              }}
                              className="p-1.5 bg-[#FDFBF7] border border-[#E6E0D8] hover:bg-[#5B6B54] hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Preview Article Page"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`edit-blog-${b.id}`}
                              onClick={() => openEditBlogModal(b)}
                              className="p-1.5 bg-[#FDFBF7] border border-[#E6E0D8] hover:bg-[#2C221E] hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Edit Blog Post"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`delete-blog-${b.id}`}
                              onClick={() => deleteBlog(b.id)}
                              className="p-1.5 bg-[#FDFBF7] border border-[#E6E0D8] hover:bg-red-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Delete Blog Post"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] w-full max-w-lg rounded-3xl shadow-2xl border border-[#E6E0D8] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E6E0D8] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#2C221E]">
                {editingProduct ? 'Edit Product Details' : 'Create New Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-[#8C827A] hover:text-[#2C221E] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Product Title *</label>
                <input
                  id="modal-prod-title"
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Category *</label>
                  <select
                    id="modal-prod-cat"
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Hero Featured Sequence (#) *</label>
                  <input
                    id="modal-prod-seq"
                    type="number"
                    min="1"
                    max="99"
                    value={prodSequence}
                    onChange={(e) => setProdSequence(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Price ($) *</label>
                  <input
                    id="modal-prod-price"
                    type="number"
                    step="0.01"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Original Price ($)</label>
                  <input
                    id="modal-prod-orig-price"
                    type="number"
                    step="0.01"
                    value={prodOrigPrice}
                    onChange={(e) => setProdOrigPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Stock Units *</label>
                  <input
                    id="modal-prod-stock"
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Main Image URL</label>
                <input
                  id="modal-prod-image"
                  type="url"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Description</label>
                <textarea
                  id="modal-prod-desc"
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="modal-prod-featured-check"
                  type="checkbox"
                  checked={prodIsFeatured}
                  onChange={(e) => setProdIsFeatured(e.target.checked)}
                  className="accent-[#5B6B54] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="modal-prod-featured-check" className="font-semibold text-[#2C221E] cursor-pointer">
                  Show in Top Featured Home Section
                </label>
              </div>

              <div className="pt-3 border-t border-[#E6E0D8] flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 py-2.5 bg-[#E6E0D8] text-[#2C221E] font-semibold rounded-xl hover:bg-[#d5cfc5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="modal-prod-save-btn"
                  type="submit"
                  className="flex-1 py-2.5 bg-[#2C221E] text-[#FDFBF7] font-semibold rounded-xl hover:bg-[#5B6B54] transition-colors"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Blog Post & SEO Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E6E0D8] p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E6E0D8] pb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#5B6B54]" />
                <h3 className="font-serif text-xl font-bold text-[#2C221E]">
                  {editingBlog ? 'Edit Blog Article & SEO Settings' : 'Create New Article & SEO Metadata'}
                </h3>
              </div>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="p-1.5 text-[#8C827A] hover:text-[#2C221E] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              {/* Blog Title */}
              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">
                  Blog Title *
                </label>
                <input
                  id="modal-blog-title"
                  type="text"
                  required
                  placeholder="e.g. Sustainable Living: The Beauty of Raw Linen & Clay"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none text-sm font-medium"
                />
              </div>

              {/* Custom URL Slug & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1 flex items-center gap-1">
                    Custom URL Slug *
                    <span className="text-[10px] text-[#8C827A] font-normal">(e.g. /blogs/my-seo-article)</span>
                  </label>
                  <input
                    id="modal-blog-slug"
                    type="text"
                    required
                    placeholder="/blogs/my-seo-article"
                    value={blogSlug}
                    onChange={(e) => setBlogSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none font-mono text-xs text-[#5B6B54]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">
                    Category *
                  </label>
                  <select
                    id="modal-blog-category"
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                  >
                    <option value="Interior & Design">Interior & Design</option>
                    <option value="Craftsmanship & Care">Craftsmanship & Care</option>
                    <option value="Artisan Heritage">Artisan Heritage</option>
                    <option value="SEO & Lifestyle">SEO & Lifestyle</option>
                  </select>
                </div>
              </div>

              {/* SEO Manager Section */}
              <div className="bg-[#F7F4EE] p-4 rounded-2xl border border-[#E6E0D8] space-y-3">
                <div className="flex items-center gap-2 text-[#5B6B54] font-serif font-bold text-xs">
                  <Search className="w-4 h-4" />
                  <span>Google Search Console SEO Settings</span>
                </div>

                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">
                    Meta Title (For Search Console indexing)
                  </label>
                  <input
                    id="modal-blog-metatitle"
                    type="text"
                    placeholder="e.g. Sustainable Living & Organic Linen Guide | Terra & Linen"
                    value={blogMetaTitle}
                    onChange={(e) => setBlogMetaTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">
                    Meta Description (For search result snippets)
                  </label>
                  <textarea
                    id="modal-blog-metadesc"
                    rows={2}
                    placeholder="e.g. Discover expert insights on curating natural home sanctuaries with washed European flax linen and stoneware ceramics."
                    value={blogMetaDescription}
                    onChange={(e) => setBlogMetaDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* HTML File Upload Input */}
              <div className="bg-[#F7F4EE] p-4 rounded-2xl border border-[#E6E0D8] space-y-2">
                <label className="block font-semibold text-[#2C221E] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-[#5B6B54]" />
                    HTML File Upload Input (.html / .htm)
                  </span>
                  {uploadedHtmlFileName && (
                    <span className="text-[10px] font-mono font-bold bg-[#5B6B54] text-white px-2 py-0.5 rounded-md">
                      Loaded: {uploadedHtmlFileName}
                    </span>
                  )}
                </label>
                <p className="text-[11px] text-[#8C827A]">
                  Upload a raw formatted <strong>.html</strong> file containing headings, paragraph formatting, links, and embedded images. The raw markup will be saved automatically.
                </p>

                <div className="relative border-2 border-dashed border-[#E6E0D8] hover:border-[#5B6B54] bg-[#FDFBF7] rounded-xl p-4 text-center cursor-pointer transition-colors">
                  <input
                    id="modal-blog-html-file-input"
                    type="file"
                    accept=".html,.htm"
                    onChange={handleHtmlFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-1 text-[#8C827A]">
                    <Upload className="w-6 h-6 text-[#5B6B54]" />
                    <span className="text-xs font-semibold text-[#2C221E]">
                      Click or drag a .html file here to import markup
                    </span>
                    <span className="text-[10px]">Accepts raw HTML files with full formatting</span>
                  </div>
                </div>
              </div>

              {/* Raw HTML / Content Markup Code Box */}
              <div>
                <label className="block font-semibold text-[#2C221E] mb-1 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5 text-[#5B6B54]" />
                  Article Content / Raw HTML Markup
                </label>
                <textarea
                  id="modal-blog-content"
                  rows={6}
                  required
                  placeholder="Paste or edit raw HTML markup or text content here..."
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none font-mono text-xs text-[#2C221E] leading-relaxed"
                />
              </div>

              {/* Author, Read Time, Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Author</label>
                  <input
                    id="modal-blog-author"
                    type="text"
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Read Time</label>
                  <input
                    id="modal-blog-readtime"
                    type="text"
                    value={blogReadTime}
                    onChange={(e) => setBlogReadTime(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Cover Image URL</label>
                  <input
                    id="modal-blog-image"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Article Excerpt (Short Listing Summary)</label>
                <textarea
                  id="modal-blog-excerpt"
                  rows={2}
                  placeholder="Brief summary displayed on the Blog Listing card..."
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F4EE] border border-[#E6E0D8] rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#E6E0D8] flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="flex-1 py-2.5 bg-[#E6E0D8] text-[#2C221E] font-semibold rounded-xl hover:bg-[#d5cfc5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="modal-blog-save-btn"
                  type="submit"
                  className="flex-1 py-2.5 bg-[#2C221E] text-[#FDFBF7] font-semibold rounded-xl hover:bg-[#5B6B54] transition-colors"
                >
                  Save & Publish Blog Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
