import { Link } from 'react-router';
import PublicLayout from '../../components/PublicLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Leaf } from 'lucide-react';

export default function RegisterPage() {
  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-[#2E7D32]/10 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-9 h-9 text-white" />
            </div>
            <CardTitle className="text-3xl text-[#1B5E20]">Бүртгүүлэх</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Овог</Label>
                <Input placeholder="Овог" className="rounded-lg border-[#2E7D32]/20" />
              </div>
              <div className="space-y-2">
                <Label>Нэр</Label>
                <Input placeholder="Нэр" className="rounded-lg border-[#2E7D32]/20" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>И-мэйл</Label>
              <Input type="email" placeholder="example@email.com" className="rounded-lg border-[#2E7D32]/20" />
            </div>

            <div className="space-y-2">
              <Label>Утасны дугаар</Label>
              <Input type="tel" placeholder="99112233" className="rounded-lg border-[#2E7D32]/20" />
            </div>

            <div className="space-y-2">
              <Label>Нууц үг</Label>
              <Input type="password" placeholder="••••••••" className="rounded-lg border-[#2E7D32]/20" />
            </div>

            <div className="space-y-2">
              <Label>Нууц үг давтах</Label>
              <Input type="password" placeholder="••••••••" className="rounded-lg border-[#2E7D32]/20" />
            </div>

            <Button className="w-full rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] mt-2">
              Бүртгүүлэх
            </Button>

            <div className="text-center text-sm text-[#5D4037]/70">
              Бүртгэлтэй юу?{' '}
              <Link to="/login" className="text-[#2E7D32] hover:underline font-medium">
                Нэвтрэх
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
