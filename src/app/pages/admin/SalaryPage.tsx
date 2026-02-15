import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { DollarSign, Download, Calculator, TrendingUp, CheckCircle } from 'lucide-react';
import { employees } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalaryPage() {
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = totalSalary / employees.length;

  const salaryData = employees.map(emp => ({
    name: emp.name,
    salary: emp.salary
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1B5E20] mb-2">Цалингийн систем</h1>
            <p className="text-[#5D4037]/70">Автомат цалингийн тооцоо ба төлбөр</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl border-[#2E7D32]/20">
              <Download className="w-4 h-4 mr-2" />
              Экспорт
            </Button>
            <Button className="rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20]">
              <Calculator className="w-4 h-4 mr-2" />
              Цалин тооцох
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="border-[#2E7D32]/10 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-8 h-8 text-white" />
                <p className="text-sm text-white/90">Нийт цалин</p>
              </div>
              <p className="text-3xl font-bold text-white">{totalSalary.toLocaleString()}₮</p>
              <p className="text-sm text-white/80 mt-2">2026/02</p>
            </CardContent>
          </Card>

          <Card className="border-[#2E7D32]/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-8 h-8 text-[#2E7D32]" />
                <p className="text-sm text-[#5D4037]/70">Дундаж цалин</p>
              </div>
              <p className="text-3xl font-bold text-[#1B5E20]">{avgSalary.toLocaleString()}₮</p>
              <Badge className="mt-2 bg-[#66BB6A]/10 text-[#2E7D32] border-[#2E7D32]/20">
                {employees.length} ажилтан
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-[#66BB6A]/20 bg-gradient-to-br from-white to-[#66BB6A]/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-8 h-8 text-[#66BB6A]" />
                <p className="text-sm text-[#5D4037]/70">Төлөв</p>
              </div>
              <p className="text-2xl font-bold text-[#2E7D32]">Төлөгдсөн</p>
              <p className="text-sm text-[#5D4037]/60 mt-2">2026/01</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="border-[#2E7D32]/10">
          <CardHeader>
            <CardTitle className="text-[#1B5E20]">Ажилтнуудын цалингийн харьцуулалт</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2E7D32" opacity={0.1} />
                <XAxis dataKey="name" stroke="#5D4037" />
                <YAxis stroke="#5D4037" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #2E7D32',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => `${value.toLocaleString()}₮`}
                />
                <Bar dataKey="salary" fill="#2E7D32" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Salary List */}
        <Card className="border-[#2E7D32]/10">
          <CardHeader>
            <CardTitle className="text-[#1B5E20]">Цалингийн жагсаалт</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employees.map(emp => (
                <div key={emp.id} className="flex items-center justify-between p-4 rounded-xl bg-[#F5FBEF] hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white font-bold">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1B5E20]">{emp.name}</h4>
                      <p className="text-sm text-[#5D4037]/60">{emp.position}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-[#2E7D32]">{emp.salary.toLocaleString()}₮</p>
                    <Badge className="mt-1 bg-[#66BB6A]/10 text-[#2E7D32] border-[#2E7D32]/20">
                      Төлөгдсөн
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
