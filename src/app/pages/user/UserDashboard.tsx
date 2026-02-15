import PublicLayout from '../../components/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Package, ShoppingBag, Heart } from 'lucide-react';

export default function UserDashboard() {
  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#1B5E20] mb-8">Миний хяналтын самбар</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-[#2E7D32]/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1B5E20]">
                <Package className="w-5 h-5" />
                Миний захиалга
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2E7D32]">5</div>
              <p className="text-sm text-[#5D4037]/60">Нийт захиалга</p>
            </CardContent>
          </Card>

          <Card className="border-[#2E7D32]/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1B5E20]">
                <ShoppingBag className="w-5 h-5" />
                Худалдан авалт
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2E7D32]">850,000₮</div>
              <p className="text-sm text-[#5D4037]/60">Нийт зарцуулсан</p>
            </CardContent>
          </Card>

          <Card className="border-[#2E7D32]/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1B5E20]">
                <Heart className="w-5 h-5" />
                Хадгалсан
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2E7D32]">12</div>
              <p className="text-sm text-[#5D4037]/60">Дуртай бүтээгдэхүүн</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#2E7D32]/10">
          <CardHeader>
            <CardTitle className="text-[#1B5E20]">Сүүлийн захиалгууд</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#5D4037]/60 text-center py-8">Захиалга байхгүй байна</p>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
