import { useParams, Link } from 'react-router';
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  Package,
  Users,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { projects, employees } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl text-[#1B5E20] mb-4">Төсөл олдсонгүй</h2>
          <Link to="/admin/projects">
            <Button className="rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20]">Буцах</Button>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const projectEmployees = employees.filter(e => project.employees.includes(e.id));

  const costData = [
    { name: 'Төсөв', value: project.budget, color: '#5D4037' },
    { name: 'Зардал', value: project.totalCost, color: '#FBC02D' },
    { name: 'Орлого', value: project.revenue, color: '#66BB6A' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-[#66BB6A]/10 text-[#2E7D32] border-[#2E7D32]/20';
      case 'delayed': return 'bg-[#FBC02D]/10 text-[#F57C00] border-[#F57C00]/20';
      case 'completed': return 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/20';
      default: return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle2 className="w-4 h-4" />;
      case 'delayed': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-track': return 'Хугацаандаа';
      case 'delayed': return 'Хоцорсон';
      case 'completed': return 'Дууссан';
      default: return status;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Link to="/admin/projects">
            <Button variant="ghost" className="mb-4 text-[#2E7D32] hover:bg-[#F5FBEF]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-[#1B5E20]">{project.name}</h1>
                <Badge className={getStatusColor(project.status)}>
                  {getStatusIcon(project.status)}
                  <span className="ml-1">{getStatusText(project.status)}</span>
                </Badge>
              </div>
              <p className="text-[#5D4037]/70">{project.client}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl border-[#2E7D32]/20 hover:bg-[#F5FBEF]">
                Засах
              </Button>
              <Button className="rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20]">
                Баримт үүсгэх
              </Button>
            </div>
          </div>
        </div>

        {/* Progress & Timeline */}
        <Card className="border-[#2E7D32]/10">
          <CardContent className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#1B5E20] mb-4">Төслийн явц</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#5D4037]/70">Гүйцэтгэл</span>
                    <span className="text-2xl font-bold text-[#2E7D32]">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-4" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 rounded-lg bg-[#F5FBEF]">
                    <Calendar className="w-5 h-5 text-[#2E7D32] mb-2" />
                    <p className="text-xs text-[#5D4037]/60">Эхлэх</p>
                    <p className="font-semibold text-[#1B5E20]">{project.startDate}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F5FBEF]">
                    <Clock className="w-5 h-5 text-[#2E7D32] mb-2" />
                    <p className="text-xs text-[#5D4037]/60">Дуусах</p>
                    <p className="font-semibold text-[#1B5E20]">{project.deadline}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#1B5E20] mb-4">Хугацааны харьцуулалт</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#5D4037]/70">Төлөвлөсөн хугацаа</span>
                      <span className="text-sm font-medium text-[#1B5E20]">
                        {project.startDate} - {project.deadline}
                      </span>
                    </div>
                    <div className="h-2 bg-[#2E7D32]/20 rounded-full">
                      <div 
                        className="h-full bg-[#2E7D32] rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {project.status === 'delayed' && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-[#FBC02D]/10 border border-[#FBC02D]/20">
                      <AlertTriangle className="w-5 h-5 text-[#F57C00] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#5D4037]">
                        Төсөл хугацаанаасаа хоцорч байна. Шаардлагатай арга хэмжээ авах хэрэгтэй.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#2E7D32]" />
                    <div>
                      <p className="text-xs text-[#5D4037]/60">Хариуцсан менежер</p>
                      <p className="font-semibold text-[#1B5E20]">{project.manager}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Control System */}
        <Card className="border-[#2E7D32]/10">
          <CardHeader>
            <CardTitle className="text-[#1B5E20] flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              Зардлын хяналт
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="border-[#2E7D32]/10 bg-gradient-to-br from-white to-[#F5FBEF]">
                <CardContent className="p-4">
                  <p className="text-xs text-[#5D4037]/60 mb-1">Төсөв</p>
                  <p className="text-2xl font-bold text-[#1B5E20]">
                    {project.budget.toLocaleString()}₮
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#66BB6A]/20 bg-gradient-to-br from-white to-[#66BB6A]/5">
                <CardContent className="p-4">
                  <p className="text-xs text-[#5D4037]/60 mb-1">Орлого</p>
                  <p className="text-2xl font-bold text-[#66BB6A]">
                    {project.revenue.toLocaleString()}₮
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#FBC02D]/20 bg-gradient-to-br from-white to-[#FBC02D]/5">
                <CardContent className="p-4">
                  <p className="text-xs text-[#5D4037]/60 mb-1">Нийт зардал</p>
                  <p className="text-2xl font-bold text-[#FBC02D]">
                    {project.totalCost.toLocaleString()}₮
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#2E7D32]/20 bg-gradient-to-br from-[#2E7D32] to-[#66BB6A]">
                <CardContent className="p-4">
                  <p className="text-xs text-white/80 mb-1">Ашиг</p>
                  <p className="text-2xl font-bold text-white">
                    {project.profit.toLocaleString()}₮
                  </p>
                  <p className="text-xs text-white/90 mt-1">
                    {project.profitMargin.toFixed(1)}% margin
                  </p>
                </CardContent>
              </Card>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={costData}>
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
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {project.profitMargin < 15 && (
              <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-[#FBC02D]/10 border border-[#FBC02D]/20">
                <AlertTriangle className="w-5 h-5 text-[#F57C00] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#5D4037]">
                  <strong>Анхааруулга:</strong> Ашгийн хэмжээ 15%-аас доош байна. Зардлыг хянах шаардлагатай.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs for Details */}
        <Tabs defaultValue="materials" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="materials">Материал</TabsTrigger>
            <TabsTrigger value="employees">Ажилтнууд</TabsTrigger>
            <TabsTrigger value="photos">Зургууд</TabsTrigger>
            <TabsTrigger value="documents">Баримт</TabsTrigger>
          </TabsList>

          <TabsContent value="materials" className="mt-6">
            <Card className="border-[#2E7D32]/10">
              <CardHeader>
                <CardTitle className="text-[#1B5E20] flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Ашигласан материал
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.materials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-4 rounded-xl bg-[#F5FBEF] hover:shadow-md transition-all">
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#1B5E20]">{material.name}</h4>
                        <p className="text-sm text-[#5D4037]/60">
                          {material.quantity} {material.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#2E7D32]">
                          {material.cost.toLocaleString()}₮
                        </p>
                        <p className="text-xs text-[#5D4037]/60">
                          {(material.cost / material.quantity).toLocaleString()}₮ / {material.unit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#2E7D32]/5 to-[#66BB6A]/5 border border-[#2E7D32]/10">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#1B5E20]">Нийт материалын зардал:</span>
                    <span className="text-2xl font-bold text-[#2E7D32]">
                      {project.materials.reduce((sum, m) => sum + m.cost, 0).toLocaleString()}₮
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="mt-6">
            <Card className="border-[#2E7D32]/10">
              <CardHeader>
                <CardTitle className="text-[#1B5E20] flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Оролцсон ажилтнууд
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {projectEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#F5FBEF] hover:shadow-md transition-all">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white font-bold">
                        {employee.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#1B5E20]">{employee.name}</h4>
                        <p className="text-sm text-[#5D4037]/60">{employee.position}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-[#FBC02D]">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm">
                              {i < Math.floor(employee.rating) ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
            <Card className="border-[#2E7D32]/10">
              <CardHeader>
                <CardTitle className="text-[#1B5E20] flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Төслийн зургууд
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.photos.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                      <img src={photo} alt={`Project ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card className="border-[#2E7D32]/10">
              <CardHeader>
                <CardTitle className="text-[#1B5E20] flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Холбогдох баримт бичиг
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#5D4037]/60 text-center py-8">Баримт бичиг байхгүй байна</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
