import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { motion } from 'motion/react';
import {
  DollarSign,
  TrendingUp,
  FolderKanban,
  Users,
  AlertCircle,
  Clock,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { projects, employees, analyticsData } from '../../data/mockData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Нийт орлого',
      value: `${analyticsData.totalRevenue.toLocaleString()}₮`,
      icon: DollarSign,
      trend: '+12.5%',
      color: 'from-[#2E7D32] to-[#66BB6A]'
    },
    {
      title: 'Нийт зардал',
      value: `${analyticsData.totalExpenses.toLocaleString()}₮`,
      icon: TrendingUp,
      trend: '+8.3%',
      color: 'from-[#FBC02D] to-[#F57C00]'
    },
    {
      title: 'Нийт ашиг',
      value: `${analyticsData.totalProfit.toLocaleString()}₮`,
      icon: Activity,
      trend: '+15.2%',
      color: 'from-[#66BB6A] to-[#2E7D32]'
    },
    {
      title: 'Нийт төсөл',
      value: analyticsData.totalProjects,
      icon: FolderKanban,
      trend: '+3',
      color: 'from-[#2E7D32] to-[#1B5E20]'
    }
  ];

  const activeProjects = projects.filter(p => p.status !== 'completed');
  const topEmployees = [...employees].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const COLORS = ['#2E7D32', '#66BB6A', '#FBC02D', '#5D4037'];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#1B5E20] mb-2">Хяналтын самбар</h1>
          <p className="text-[#5D4037]/70">Таны бизнесийн ерөнхий үзүүлэлт</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-[#2E7D32]/10 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-[#66BB6A]/10 text-[#2E7D32] border-[#2E7D32]/20">
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#1B5E20] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#5D4037]/60">{stat.title}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="border-[#2E7D32]/10">
            <CardHeader>
              <CardTitle className="text-[#1B5E20]">Орлого ба зардлын харьцаа</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.revenueGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2E7D32" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#5D4037" />
                  <YAxis stroke="#5D4037" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #2E7D32',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#2E7D32" name="Орлого" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expenses" fill="#FBC02D" name="Зардал" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expense Breakdown */}
          <Card className="border-[#2E7D32]/10">
            <CardHeader>
              <CardTitle className="text-[#1B5E20]">Зардлын задаргаа</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #2E7D32',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Active Projects */}
          <Card className="border-[#2E7D32]/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-[#1B5E20]">
                <span>Идэвхитэй төслүүд</span>
                <Link to="/admin/projects" className="text-sm text-[#2E7D32] hover:underline">
                  Бүгдийг үзэх
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeProjects.map((project) => (
                <Link key={project.id} to={`/admin/projects/${project.id}`}>
                  <div className="p-4 rounded-xl bg-[#F5FBEF] hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-[#1B5E20]">{project.name}</h4>
                        <p className="text-sm text-[#5D4037]/60">{project.client}</p>
                      </div>
                      <Badge 
                        className={
                          project.status === 'on-track' 
                            ? 'bg-[#66BB6A]/10 text-[#2E7D32] border-[#2E7D32]/20'
                            : 'bg-[#FBC02D]/10 text-[#F57C00] border-[#F57C00]/20'
                        }
                      >
                        {project.status === 'on-track' ? (
                          <><CheckCircle2 className="w-3 h-3 mr-1" /> Хугацаандаа</>
                        ) : (
                          <><Clock className="w-3 h-3 mr-1" /> Хоцорсон</>
                        )}
                      </Badge>
                    </div>
                    <Progress value={project.progress} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#5D4037]/60">{project.progress}% дууссан</span>
                      <span className="text-[#2E7D32] font-medium">
                        {project.profitMargin.toFixed(1)}% ашиг
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Top Employees */}
          <Card className="border-[#2E7D32]/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-[#1B5E20]">
                <span>Шилдэг ажилтнууд</span>
                <Link to="/admin/employees" className="text-sm text-[#2E7D32] hover:underline">
                  Бүгдийг үзэх
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topEmployees.map((employee, index) => (
                <div key={employee.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#F5FBEF]">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white font-bold">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#1B5E20]">{employee.name}</h4>
                    <p className="text-sm text-[#5D4037]/60">{employee.position}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-[#FBC02D] mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-sm">
                          {i < Math.floor(employee.rating) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#5D4037]/60">
                      {employee.tasksCompleted} даалгавар
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="border-[#FBC02D]/20 bg-[#FBC02D]/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-[#F57C00] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-[#1B5E20] mb-2">Анхааруулга</h4>
                <ul className="space-y-1 text-sm text-[#5D4037]/70">
                  <li>• Оффисын ногоон орчин төсөл хугацаанаасаа 3 хоног хоцорч байна</li>
                  <li>• Дорж ажилтан энэ сард 5 удаа хоцорсон байна</li>
                  <li>• Органик бордоо бүтээгдэхүүний үлдэгдэл 50-аас доош байна</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
