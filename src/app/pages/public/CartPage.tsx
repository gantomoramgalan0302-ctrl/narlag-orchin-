import { Link } from 'react-router';
import PublicLayout from '../../components/PublicLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { motion } from 'motion/react';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartPageProps {
  cartItems: any[];
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
}

export default function CartPage({ cartItems, removeFromCart, updateCartQuantity }: CartPageProps) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <PublicLayout cartItemsCount={cartItems.length}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-[#2E7D32]/20 mb-6" />
          <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">Таны сагс хоосон байна</h2>
          <p className="text-[#5D4037]/70 mb-8">Дэлгүүрээс бүтээгдэхүүн сонгоно уу</p>
          <Link to="/store">
            <Button size="lg" className="rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] shadow-lg">
              Дэлгүүр очих
            </Button>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout cartItemsCount={cartItems.length}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#1B5E20] mb-8">Миний сагс</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-[#2E7D32]/10">
                  <CardContent className="p-4 flex gap-4">
                    <img
                      src={item.image}
                      alt={item.nameMn}
                      className="w-24 h-24 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1B5E20] mb-1">{item.nameMn}</h3>
                      <p className="text-sm text-[#5D4037]/60 mb-3">{item.category}</p>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-lg border-[#2E7D32]/20"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 h-8 text-center rounded-lg border-[#2E7D32]/20"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-lg border-[#2E7D32]/20"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-[#2E7D32] mb-2">
                        {(item.price * item.quantity).toLocaleString()}₮
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <Card className="sticky top-24 border-[#2E7D32]/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#1B5E20] mb-6">Захиалгын дүн</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#5D4037]/70">
                    <span>Бүтээгдэхүүн ({cartItems.length})</span>
                    <span>{total.toLocaleString()}₮</span>
                  </div>
                  <div className="flex justify-between text-[#5D4037]/70">
                    <span>Хүргэлт</span>
                    <span className="text-[#2E7D32]">Үнэгүй</span>
                  </div>
                  <div className="border-t border-[#2E7D32]/10 pt-3 flex justify-between font-bold text-lg">
                    <span className="text-[#1B5E20]">Нийт дүн</span>
                    <span className="text-[#2E7D32]">{total.toLocaleString()}₮</span>
                  </div>
                </div>

                <Button size="lg" className="w-full rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] shadow-lg mb-3">
                  Төлбөр төлөх
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Link to="/store">
                  <Button size="lg" variant="outline" className="w-full rounded-xl border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#F5FBEF]">
                    Үргэлжлүүлэн худалдан авах
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
