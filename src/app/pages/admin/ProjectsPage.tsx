import { useState } from 'react';
import { Link } from 'react-router';
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { motion } from 'motion/react';
import { Plus, Search, Calendar, User, TrendingUp, CheckCircle2, Clock, AlertCircle, Eye } from 'lucide-react';
import { projects } from '../../data/mockData';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'on-track' | 'delayed' | 'completed'>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle2 className="w-4 h-4" />;
      case 'delayed': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-[#66BB6A]/10 text-[#2E7D32] border-[#2E7D32]/20';
      case 'delayed': return 'bg-[#FBC02D]/10 text-[#F57C00] border-[#F57C00]/20';
      case 'completed': return 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/20';
      default: return '';
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

  const getProgressColor = (progress: number, status: string) => {
    if (status === 'completed') return 'bg-[#2E7D32]';
    if (status === 'delayed') return 'bg-[#FBC02D]';
    return 'bg-[#66BB6A]';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1B5E20] mb-2">Төслүүд</h1>
            <p className="text-[#5D4037]/70">Бүх төслийн хяналт ба удирдлага</p>
          </div>
          <Button className="rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Шинэ төсөл
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-[#2E7D32]/10">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5D4037]/40" />
                <Input
                  placeholder="Төсөл хайх..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-[#2E7D32]/20"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  className={`rounded-xl ${
                    statusFilter === 'all'
                      ? 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                      : 'border-[#2E7D32]/20 text-[#2E7D32] hover:bg-[#F5FBEF]'
                  }`}
                  onClick={() => setStatusFilter('all')}
                >
                  Бүгд
                </Button>
                <Button
                  variant={statusFilter === 'on-track' ? 'default' : 'outline'}
                  className={`rounded-xl ${
                    statusFilter === 'on-track'
                      ? 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                      : 'border-[#2E7D32]/20 text-[#2E7D32] hover:bg-[#F5FBEF]'
                  }`}
                  onClick={() => setStatusFilter('on-track')}
                >
                  Хугацаандаа
                </Button>
                <Button
                  variant={statusFilter === 'delayed' ? 'default' : 'outline'}
                  className={`rounded-xl ${
                    statusFilter === 'delayed'
                      ? 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                      : 'border-[#2E7D32]/20 text-[#2E7D32] hover:bg-[#F5FBEF]'
                  }`}
                  onClick={() => setStatusFilter('delayed')}
                >
                  Хоцорсон
                </Button>
                <Button
                  variant={statusFilter === 'completed' ? 'default' : 'outline'}
                  className={`rounded-xl ${
                    statusFilter === 'completed'
                      ? 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                      : 'border-[#2E7D32]/20 text-[#2E7D32] hover:bg-[#F5FBEF]'
                  }`}
                  onClick={() => setStatusFilter('completed')}
                >
                  Дууссан
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-[#2E7D32]/10 hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Project Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-[#1B5E20]">{project.name}</h3>
                            <Badge className={getStatusColor(project.status)}>
                              {getStatusIcon(project.status)}
                              <span className="ml-1">{getStatusText(project.status)}</span>
                            </Badge>
                          </div>
                          <p className="text-[#5D4037]/70">{project.client}</p>
                        </div>
                        <Link to={`/admin/projects/${project.id}`}>
                          <Button variant="outline" className="rounded-xl border-[#2E7D32]/20 hover:bg-[#F5FBEF]">
                            <Eye className="w-4 h-4 mr-2" />
                            Дэлгэрэнгүй
                          </Button>
                        </Link>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#1B5E20]">Гүйцэтгэл</span>
                          <span className="text-sm font-bold text-[#2E7D32]">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-3" />
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-[#2E7D32]" />
                          <div>
                            <p className="text-[#5D4037]/60 text-xs">Менежер</p>
                            <p className="font-medium text-[#1B5E20]">{project.manager}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#2E7D32]" />
                          <div>
                            <p className="text-[#5D4037]/60 text-xs">Эхлэх</p>
                            <p className="font-medium text-[#1B5E20]">{project.startDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-[#2E7D32]" />
                          <div>
                            <p className="text-[#5D4037]/60 text-xs">Дуусах</p>
                            <p className="font-medium text-[#1B5E20]">{project.deadline}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-[#2E7D32]" />
                          <div>
                            <p className="text-[#5D4037]/60 text-xs">Ашгийн хэмжээ</p>
                            <p className="font-medium text-[#2E7D32]">{project.profitMargin.toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Financial Summary */}
                    <div className="lg:w-64 flex-shrink-0">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#F5FBEF] to-white border border-[#2E7D32]/10 space-y-3">
                        <div>
                          <p className="text-xs text-[#5D4037]/60 mb-1">Төсөв</p>
                          <p className="text-lg font-bold text-[#1B5E20]">
                            {project.budget.toLocaleString()}₮
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#5D4037]/60 mb-1">Орлого</p>
                          <p className="text-lg font-bold text-[#66BB6A]">
                            {project.revenue.toLocaleString()}₮
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#5D4037]/60 mb-1">Зардал</p>
                          <p className="text-lg font-bold text-[#FBC02D]">
                            {project.totalCost.toLocaleString()}₮
                          </p>
                        </div>
                        <div className="pt-3 border-t border-[#2E7D32]/10">
                          <p className="text-xs text-[#5D4037]/60 mb-1">Ашиг</p>
                          <p className="text-xl font-bold text-[#2E7D32]">
                            {project.profit.toLocaleString()}₮
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="border-[#2E7D32]/10">
            <CardContent className="p-12 text-center">
              <p className="text-[#5D4037]/60">Төсөл олдсонгүй</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
