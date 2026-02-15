import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import PublicLayout from '../../components/PublicLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Leaf } from 'lucide-react';
import { toast } from 'sonner';

interface LoginPageProps {
  setAuth: (value: boolean) => void;
  setRole: (role: 'customer' | 'admin' | 'worker') => void;
}

export default function LoginPage({ setAuth, setRole }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role: 'customer' | 'admin' | 'worker') => {
    setAuth(true);
    setRole(role);
    toast.success('Амжилттай нэвтэрлээ!');
    
    if (role === 'admin') navigate('/admin');
    else if (role === 'worker') navigate('/worker');
    else navigate('/dashboard');
  };

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-[#2E7D32]/10 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-9 h-9 text-white" />
            </div>
            <CardTitle className="text-3xl text-[#1B5E20]">Нэвтрэх</CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="customer">Хэрэглэгч</TabsTrigger>
                <TabsTrigger value="admin">Админ</TabsTrigger>
                <TabsTrigger value="worker">Ажилтан</TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-4">
                <div className="space-y-2">
                  <Label>И-мэйл</Label>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg border-[#2E7D32]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Нууц үг</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg border-[#2E7D32]/20"
                  />
                </div>
                <Button
                  className="w-full rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20]"
                  onClick={() => handleLogin('customer')}
                >
                  Нэвтрэх
                </Button>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <div className="space-y-2">
                  <Label>И-мэйл</Label>
                  <Input
                    type="email"
                    placeholder="admin@narlag.mn"
                    defaultValue="admin@narlag.mn"
                    className="rounded-lg border-[#2E7D32]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Нууц үг</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    defaultValue="admin123"
                    className="rounded-lg border-[#2E7D32]/20"
                  />
                </div>
                <Button
                  className="w-full rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20]"
                  onClick={() => handleLogin('admin')}
                >
                  Админаар нэвтрэх
                </Button>
              </TabsContent>

              <TabsContent value="worker" className="space-y-4">
                <div className="space-y-2">
                  <Label>Утасны дугаар</Label>
                  <Input
                    type="tel"
                    placeholder="99112233"
                    className="rounded-lg border-[#2E7D32]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Нууц үг</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="rounded-lg border-[#2E7D32]/20"
                  />
                </div>
                <Button
                  className="w-full rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20]"
                  onClick={() => handleLogin('worker')}
                >
                  Ажилтнаар нэвтрэх
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-[#5D4037]/70">
              Бүртгэлгүй юу?{' '}
              <Link to="/register" className="text-[#2E7D32] hover:underline font-medium">
                Бүртгүүлэх
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
