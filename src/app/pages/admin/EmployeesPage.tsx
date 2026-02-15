import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { motion } from 'motion/react';
import { Plus, Search, Phone, Mail, TrendingUp, Award, Circle } from 'lucide-react';
import { employees } from '../../data/mockData';

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topPerformer = [...employees].sort((a, b) => b.rating - a.rating)[0];
  const mostRevenue = [...employees].sort((a, b) => b.revenue - a.revenue)[0];
  const mostLate = [...employees].sort((a, b) => b.lateCount - a.lateCount)[0];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1B5E20] mb-2">Ажилтнууд</h1>
            <p className="text-[#5D4037]/70">Багийн гишүүдийн удирдлага</p>
          </div>
          <Button className="rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20]">
            <Plus className="w-5 h-5 mr-2" />
            Ажилтан нэмэх
          </Button>
        </div>

        {/* Performance Highlights */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-[#2E7D32]/10 bg-gradient-to-br from-white to-[#66BB6A]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1B5E20] text-lg">
                <Award className="w-5 h-5" />
                Шилдэг ажилтан
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[#2E7D32] mb-1">{topPerformer.name}</p>
              <p className="text-sm text-[#5D4037]/60">{topPerformer.rating.toFixed(1)} ★ үнэлгээтэй</p>
            </CardContent>
          </Card>

          <Card className="border-[#2E7D32]/10 bg-gradient-to-br from-white to-[#66BB6A]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1B5E20] text-lg">
                <TrendingUp className="w-5 h-5" />
                Хамгийн их орлого
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[#2E7D32] mb-1">{mostRevenue.name}</p>
              <p className="text-sm text-[#5D4037]/60">{mostRevenue.revenue.toLocaleString()}₮</p>
            </CardContent>
          </Card>

          <Card className="border-[#FBC02D]/10 bg-gradient-to-br from-white to-[#FBC02D]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1B5E20] text-lg">
                <Circle className="w-5 h-5" />
                Хамгийн их хоцорсон
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[#F57C00] mb-1">{mostLate.name}</p>
              <p className="text-sm text-[#5D4037]/60">{mostLate.lateCount} удаа хоцорсон</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="border-[#2E7D32]/10">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5D4037]/40" />
              <Input
                placeholder="Ажилтан хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-[#2E7D32]/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Employees Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-[#2E7D32]/10 hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {employee.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-[#1B5E20]">{employee.name}</h3>
                          <p className="text-sm text-[#5D4037]/60">{employee.position}</p>
                        </div>
                        <Badge className={employee.status === 'active' ? 'bg-[#66BB6A]/10 text-[#2E7D32] border-[#2E7D32]/20' : 'bg-gray-100 text-gray-600'}>
                          {employee.status === 'active' ? 'Идэвхитэй' : 'Offline'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-[#5D4037]/60 mb-1">Үнэлгээ</p>
                          <div className="flex items-center gap-1 text-[#FBC02D]">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < Math.floor(employee.rating) ? '★' : '☆'}</span>
                            ))}
                            <span className="ml-1 text-sm text-[#1B5E20]">{employee.rating.toFixed(1)}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-[#5D4037]/60 mb-1">Даалгавар</p>
                          <p className="font-semibold text-[#2E7D32]">{employee.tasksCompleted} дууссан</p>
                        </div>

                        <div>
                          <p className="text-xs text-[#5D4037]/60 mb-1">Орлого</p>
                          <p className="font-semibold text-[#2E7D32]">{employee.revenue.toLocaleString()}₮</p>
                        </div>

                        <div>
                          <p className="text-xs text-[#5D4037]/60 mb-1">Хоцорсон</p>
                          <p className={`font-semibold ${employee.lateCount > 3 ? 'text-[#F57C00]' : 'text-[#2E7D32]'}`}>
                            {employee.lateCount} удаа
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4 pt-4 border-t border-[#2E7D32]/10">
                        <div className="flex items-center gap-2 text-sm text-[#5D4037]/70">
                          <Phone className="w-4 h-4" />
                          {employee.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#5D4037]/70">
                          <Mail className="w-4 h-4" />
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
