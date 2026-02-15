import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  ClipboardCheck,
  DollarSign,
  BarChart3,
  FileText,
  Calculator,
  Menu,
  X,
  Leaf,
  LogOut
} from 'lucide-react';
import { Button } from './ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Хяналтын самбар', href: '/admin', icon: LayoutDashboard },
    { name: 'Төслүүд', href: '/admin/projects', icon: FolderKanban },
    { name: 'Ажилтнууд', href: '/admin/employees', icon: Users },
    { name: 'Ирц', href: '/admin/attendance', icon: ClipboardCheck },
    { name: 'Цалин', href: '/admin/salary', icon: DollarSign },
    { name: 'Шинжилгээ', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Баримт бичиг', href: '/admin/documents', icon: FileText },
    { name: 'Үнийн санал', href: '/admin/quotation', icon: Calculator }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F5FBEF]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#2E7D32]/10 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#F5FBEF] text-[#2E7D32]"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-[#1B5E20]">NARLAG ORCHIN</h1>
                <p className="text-xs text-[#5D4037]/70">Admin System</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-[#1B5E20]">Админ</p>
              <p className="text-xs text-[#5D4037]/60">admin@narlag.mn</p>
            </div>
            <Link to="/">
              <Button variant="outline" size="icon" className="rounded-xl border-[#2E7D32]/20">
                <LogOut className="w-5 h-5 text-[#5D4037]" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-[#2E7D32]/10 min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-[#2E7D32] to-[#66BB6A] text-white shadow-lg'
                    : 'text-[#1B5E20] hover:bg-[#F5FBEF]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-[#2E7D32]/10 z-50 lg:hidden overflow-y-auto"
              >
                <nav className="p-4 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-[#2E7D32] to-[#66BB6A] text-white shadow-lg'
                          : 'text-[#1B5E20] hover:bg-[#F5FBEF]'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
