import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Menu, X, Search, ChevronDown, User } from 'lucide-react';
import { ViewPage } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    getTotalCartItemsCount,
    setIsCartOpen,
    categories,
    setSelectedCategorySlug,
    auth,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const cartCount = getTotalCartItemsCount();

  const handleNavClick = (page: ViewPage, categorySlug?: string) => {
    setCurrentPage(page);
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
    }
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('shop');
      setShowSearchInput(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E6E0D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2C221E] hover:bg-[#F7F4EE] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center">
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="text-left cursor-pointer group"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2C221E] group-hover:text-[#5B6B54] transition-colors">
              TERRA & LINEN
            </span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-[#8C827A] -mt-1 font-sans font-medium">
              Artisanal Goods
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
          <button
            id="nav-link-home"
            onClick={() => handleNavClick('home')}
            className={`transition-colors py-2 cursor-pointer ${
              currentPage === 'home'
                ? 'text-[#5B6B54] font-semibold border-b-2 border-[#5B6B54]'
                : 'text-[#2C221E] hover:text-[#5B6B54]'
            }`}
          >
            Home
          </button>

          <button
            id="nav-link-shop"
            onClick={() => handleNavClick('shop')}
            className={`transition-colors py-2 cursor-pointer ${
              currentPage === 'shop'
                ? 'text-[#5B6B54] font-semibold border-b-2 border-[#5B6B54]'
                : 'text-[#2C221E] hover:text-[#5B6B54]'
            }`}
          >
            Shop (Catalog)
          </button>

          {/* Categories Dropdown */}
          <div className="relative group">
            <button
              id="nav-categories-dropdown-btn"
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              className="flex items-center gap-1.5 py-2 text-[#2C221E] hover:text-[#5B6B54] transition-colors cursor-pointer"
            >
              <span>Categories</span>
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>

            {categoriesDropdownOpen && (
              <div
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
                className="absolute top-full left-0 w-64 bg-[#FDFBF7] border border-[#E6E0D8] rounded-xl shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div className="px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#8C827A]">
                  Curated Collections
                </div>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    id={`nav-cat-${cat.id}`}
                    onClick={() => handleNavClick('shop', cat.name)}
                    className="w-full text-left px-4 py-2 text-sm text-[#2C221E] hover:bg-[#F7F4EE] hover:text-[#5B6B54] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-[#8C827A]">{cat.itemCount || ''}</span>
                  </button>
                ))}
                <div className="border-t border-[#E6E0D8] mt-2 pt-2 px-4">
                  <button
                    id="nav-cat-view-all"
                    onClick={() => handleNavClick('shop')}
                    className="text-xs font-semibold text-[#5B6B54] hover:underline cursor-pointer"
                  >
                    View All Categories &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            id="nav-link-about"
            onClick={() => handleNavClick('about')}
            className={`transition-colors py-2 cursor-pointer ${
              currentPage === 'about'
                ? 'text-[#5B6B54] font-semibold border-b-2 border-[#5B6B54]'
                : 'text-[#2C221E] hover:text-[#5B6B54]'
            }`}
          >
            About Us
          </button>

          <button
            id="nav-link-contact"
            onClick={() => handleNavClick('contact')}
            className={`transition-colors py-2 cursor-pointer ${
              currentPage === 'contact'
                ? 'text-[#5B6B54] font-semibold border-b-2 border-[#5B6B54]'
                : 'text-[#2C221E] hover:text-[#5B6B54]'
            }`}
          >
            Contact Us
          </button>

          <button
            id="nav-link-blogs"
            onClick={() => handleNavClick('blogs')}
            className={`transition-colors py-2 cursor-pointer ${
              currentPage === 'blogs'
                ? 'text-[#5B6B54] font-semibold border-b-2 border-[#5B6B54]'
                : 'text-[#2C221E] hover:text-[#5B6B54]'
            }`}
          >
            Blogs
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Search Toggle/Input */}
          {showSearchInput ? (
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                id="nav-search-input"
                type="text"
                placeholder="Search ceramics, linen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-40 sm:w-56 pl-8 pr-3 py-1.5 text-xs bg-[#F7F4EE] border border-[#5B6B54] rounded-lg focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-[#8C827A] absolute left-2.5" />
              <button
                type="button"
                onClick={() => setShowSearchInput(false)}
                className="ml-1 text-xs text-[#8C827A] hover:text-[#2C221E] p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <button
              id="nav-search-trigger-btn"
              onClick={() => setShowSearchInput(true)}
              className="p-2 text-[#2C221E] hover:text-[#5B6B54] hover:bg-[#F7F4EE] rounded-full transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Auth/User Icon */}
          <button
            id="nav-auth-btn"
            onClick={() => handleNavClick('auth')}
            className="p-2 text-[#2C221E] hover:text-[#5B6B54] hover:bg-[#F7F4EE] rounded-full transition-colors cursor-pointer"
            title={auth.isAuthenticated ? `Logged in as ${auth.user?.name}` : 'Login / Auth'}
            aria-label="User Auth"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Interactive Cart Icon */}
          <button
            id="nav-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-[#F7F4EE] hover:bg-[#E6E0D8] text-[#2C221E] rounded-full transition-all cursor-pointer border border-[#E6E0D8]"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#2C221E]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#5B6B54] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#E6E0D8] px-5 py-4 space-y-3 animate-in slide-in-from-top-4">
          <button
            id="mobile-nav-home"
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 font-medium text-[#2C221E] hover:text-[#5B6B54]"
          >
            Home
          </button>
          <button
            id="mobile-nav-shop"
            onClick={() => handleNavClick('shop')}
            className="block w-full text-left py-2 font-medium text-[#2C221E] hover:text-[#5B6B54]"
          >
            Shop (Full Catalog)
          </button>
          <div className="pl-3 border-l-2 border-[#E6E0D8] space-y-2 py-1">
            <span className="text-xs uppercase tracking-wider text-[#8C827A] font-semibold">Categories</span>
            {categories.map(cat => (
              <button
                key={cat.id}
                id={`mobile-cat-${cat.id}`}
                onClick={() => handleNavClick('shop', cat.name)}
                className="block text-sm text-[#2C221E] hover:text-[#5B6B54] py-1"
              >
                {cat.name}
              </button>
            ))}
          </div>
          <button
            id="mobile-nav-about"
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 font-medium text-[#2C221E] hover:text-[#5B6B54]"
          >
            About Us
          </button>
          <button
            id="mobile-nav-contact"
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 font-medium text-[#2C221E] hover:text-[#5B6B54]"
          >
            Contact Us
          </button>
          <button
            id="mobile-nav-blogs"
            onClick={() => handleNavClick('blogs')}
            className="block w-full text-left py-2 font-medium text-[#2C221E] hover:text-[#5B6B54]"
          >
            Blogs
          </button>
        </div>
      )}
    </header>
  );
};
