import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Calendar } from '../../components/ui/calendar';
import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Clock, MapPin, Users, Activity } from 'lucide-react';
import { attendance, employees } from '../../data/mockData';

export default function AttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const todayAttendance = attendance.filter(a => a.date === '2026-02-12');
  const presentCount = todayAttendance.filter(a => a.status === 'present').length;
  const lateCount = todayAttendance.filter(a => a.status === 'late').length;
  const absentCount = employees.length - todayAttendance.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-[#66BB6A]/10 text-[#2E7D32] border-[#2E7D32]/20"><CheckCircle2 className="w-3 h-3 mr-1" />Ирсэн</Badge>;
      case 'late':
        return <Badge className="bg-[#FBC02D]/10 text-[#F57C00] border-[#F57C00]/20"><Clock className="w-3 h-3 mr-1" />Хоцорсон</Badge>;
      case 'absent':
        return <Badge className="bg-red-50 text-red-600 border-red-200"><XCircle className="w-3 h-3 mr-1" />Тасалсан</Badge>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1B5E20] mb-2">Ирц бүртгэл</h1>
          <p className="text-[#5D4037]/70">Ажилтнуудын ирц хяналт</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[#2E7D32]/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2E7D32]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#2E7D32]" />
                </div>
                <div>
                  <p className="text-sm text-[#5D4037]/60">Нийт ажилтан</p>
                  <p className="text-2xl font-bold text-[#1B5E20]">{employees.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#66BB6A]/20 bg-gradient-to-br from-white to-[#66BB6A]/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#66BB6A]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#2E7D32]" />
                </div>
                <div>
                  <p className="text-sm text-[#5D4037]/60">Ирсэн</p>
                  <p className="text-2xl font-bold text-[#2E7D32]">{presentCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#FBC02D]/20 bg-gradient-to-br from-white to-[#FBC02D]/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FBC02D]/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#F57C00]" />
                </div>
                <div>
                  <p className="text-sm text-[#5D4037]/60">Хоцорсон</p>
                  <p className="text-2xl font-bold text-[#F57C00]">{lateCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-gradient-to-br from-white to-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-[#5D4037]/60">Тасалсан</p>
                  <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Attendance List */}
          <div className="lg:col-span-2">
            <Card className="border-[#2E7D32]/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1B5E20]">
                  <Activity className="w-5 h-5" />
                  Өнөөдрийн ирц
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayAttendance.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-[#F5FBEF] hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white font-bold">
                          {record.employeeName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1B5E20]">{record.employeeName}</h4>
                          <div className="flex items-center gap-2 text-sm text-[#5D4037]/60">
                            <MapPin className="w-3 h-3" />
                            {record.location}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="mb-2">
                          {getStatusBadge(record.status)}
                        </div>
                        <div className="text-sm text-[#5D4037]/70">
                          <span className="font-medium">{record.checkIn}</span>
                          {record.checkOut && <span> - {record.checkOut}</span>}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {todayAttendance.length === 0 && (
                    <div className="text-center py-8 text-[#5D4037]/60">
                      Ирц бүртгэгдээгүй байна
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar */}
          <div>
            <Card className="border-[#2E7D32]/10">
              <CardHeader>
                <CardTitle className="text-[#1B5E20]">Календарь</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-xl border-[#2E7D32]/10"
                />

                <div className="mt-6 space-y-3">
                  <div className="p-3 rounded-lg bg-[#66BB6A]/5 border border-[#66BB6A]/20">
                    <div className="flex items-center gap-2 text-sm text-[#2E7D32]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ирсэн: {presentCount} ажилтан</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FBC02D]/5 border border-[#FBC02D]/20">
                    <div className="flex items-center gap-2 text-sm text-[#F57C00]">
                      <Clock className="w-4 h-4" />
                      <span>Хоцорсон: {lateCount} ажилтан</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <XCircle className="w-4 h-4" />
                      <span>Тасалсан: {absentCount} ажилтан</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Attendance Heatmap - Monthly View */}
        <Card className="border-[#2E7D32]/10">
          <CardHeader>
            <CardTitle className="text-[#1B5E20]">Сарын ирц хуваарь</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2E7D32]/10">
                    <th className="text-left p-3 text-sm font-medium text-[#1B5E20]">Ажилтан</th>
                    {[...Array(7)].map((_, i) => (
                      <th key={i} className="p-3 text-sm font-medium text-[#1B5E20]">
                        {i + 6}/02
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id} className="border-b border-[#2E7D32]/5">
                      <td className="p-3 font-medium text-[#1B5E20]">{emp.name}</td>
                      {[...Array(7)].map((_, i) => (
                        <td key={i} className="p-3">
                          <div className={`w-8 h-8 rounded-lg mx-auto ${
                            Math.random() > 0.2 
                              ? 'bg-[#66BB6A]/20 hover:bg-[#66BB6A]/40' 
                              : Math.random() > 0.5 
                                ? 'bg-[#FBC02D]/20 hover:bg-[#FBC02D]/40' 
                                : 'bg-red-100 hover:bg-red-200'
                          } transition-colors cursor-pointer`} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
