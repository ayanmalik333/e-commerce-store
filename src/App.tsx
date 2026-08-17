import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { EthicalSourcingPage } from './pages/EthicalSourcingPage';
import { ManagerAuthPage } from './pages/ManagerAuthPage';

function MainAppContent() {
  const { currentPage } = useStore();

  // If on initial entry Auth Gate view
  if (currentPage === 'auth') {
    return (
      <main className="min-h-screen bg-[#FDFBF7]">
        <AuthPage />
        <Toast />
      </main>
    );
  }

  if (currentPage === 'manager-auth') {
    return (
      <main className="min-h-screen bg-[#FDFBF7]">
        <ManagerAuthPage />
        <Toast />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] flex flex-col font-sans selection:bg-[#5B6B54]/20 selection:text-[#2C221E]">
      <Navbar />

      <main className="flex-grow">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'blogs' && <BlogListPage />}
        {currentPage === 'blog-detail' && <BlogDetailPage />}
        {currentPage === 'admin' && <AdminPanelPage />}
        {currentPage === 'privacy-policy' && <PrivacyPolicyPage />}
        {currentPage === 'terms-of-service' && <TermsOfServicePage />}
        {currentPage === 'ethical-sourcing' && <EthicalSourcingPage />}
      </main>

      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
