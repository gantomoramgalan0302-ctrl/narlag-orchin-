import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import { Toaster } from './components/ui/sonner';

// Public Pages
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';
import StorePage from './pages/public/StorePage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import CartPage from './pages/public/CartPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ContactPage from './pages/public/ContactPage';

// User Pages
import UserDashboard from './pages/user/UserDashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectsPage from './pages/admin/ProjectsPage';
import ProjectDetailPage from './pages/admin/ProjectDetailPage';
import EmployeesPage from './pages/admin/EmployeesPage';
import AttendancePage from './pages/admin/AttendancePage';
import SalaryPage from './pages/admin/SalaryPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import DocumentsPage from './pages/admin/DocumentsPage';
import QuotationPage from './pages/admin/QuotationPage';

// Worker Pages
import FieldWorkerPage from './pages/worker/FieldWorkerPage';

export default function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'customer' | 'admin' | 'worker'>('customer');

  const addToCart = (product: any, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/store" element={<StorePage addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateCartQuantity={updateCartQuantity}
              />
            } 
          />
          <Route path="/login" element={<LoginPage setAuth={setIsAuthenticated} setRole={setUserRole} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* User Routes */}
          <Route path="/dashboard" element={<UserDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<ProjectsPage />} />
          <Route path="/admin/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/admin/employees" element={<EmployeesPage />} />
          <Route path="/admin/attendance" element={<AttendancePage />} />
          <Route path="/admin/salary" element={<SalaryPage />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
          <Route path="/admin/documents" element={<DocumentsPage />} />
          <Route path="/admin/quotation" element={<QuotationPage />} />

          {/* Worker Routes */}
          <Route path="/worker" element={<FieldWorkerPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </>
  );
}