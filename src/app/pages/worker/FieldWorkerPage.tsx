import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { motion } from 'motion/react';
import {
  LogIn,
  LogOut,
  Camera,
  CheckCircle,
  Clock,
  MapPin,
  User,
  Home,
  List,
  Bell
} from 'lucide-react';
import { tasks } from '../../data/mockData';
import { toast } from 'sonner';

export default function FieldWorkerPage() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit' }));
  const [activeTab, setActiveTab] = useState<'home' | 'tasks'>('home');

  const workerTasks = tasks.filter(t => t.status !== 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const handleCheckIn = () => {
    setCheckedIn(true);
    toast.success('Амжилттай ирц бүртгэгдлээ');
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    toast.success('Амжилттай гарсан бүртгэгдлээ');
  };

  const handleUploadPhoto = () => {
    toast.success('Зураг амжилттай байршуулагдлаа');
  };

  return (
    <div className="min-h-screen bg-[#F5FBEF] pb-20">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-[#2E7D32] to-[#66BB6A] text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Сайн байна уу, Болд</h1>
            <p className="text-white/90 text-sm">Ажилчин</p>
          </div>
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
              <LogOut className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Status Card */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Төв цэцэрлэг</span>
            </div>
            <Badge className={checkedIn ? 'bg-[#66BB6A] text-white' : 'bg-white/20 text-white'}>
              {checkedIn ? 'Идэвхитэй' : 'Offline'}
            </Badge>
          </div>
          <div className="text-3xl font-bold">{currentTime}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {activeTab === 'home' && (
          <>
            {/* Check In/Out */}
            <Card className="border-[#2E7D32]/10">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {!checkedIn ? (
                    <Button
                      size="lg"
                      className="rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] h-24 flex-col gap-2"
                      onClick={handleCheckIn}
                    >
                      <LogIn className="w-8 h-8" />
                      <span>Ирсэн</span>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-2 border-[#2E7D32] text-[#2E7D32] h-24 flex-col gap-2 opacity-50"
                      disabled
                    >
                      <LogIn className="w-8 h-8" />
                      <span>Бүртгэгдсэн</span>
                    </Button>
                  )}

                  {checkedIn ? (
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-2 border-red-500 text-red-500 hover:bg-red-50 h-24 flex-col gap-2"
                      onClick={handleCheckOut}
                    >
                      <LogOut className="w-8 h-8" />
                      <span>Гарах</span>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-2 border-gray-300 text-gray-400 h-24 flex-col gap-2 opacity-50"
                      disabled
                    >
                      <LogOut className="w-8 h-8" />
                      <span>Гарах</span>
                    </Button>
                  )}
                </div>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full mt-3 rounded-xl border-2 border-[#66BB6A] text-[#66BB6A] hover:bg-[#66BB6A]/5 h-16 flex-row gap-3"
                  onClick={handleUploadPhoto}
                >
                  <Camera className="w-6 h-6" />
                  <span>Ажлын зураг оруулах</span>
                </Button>
              </CardContent>
            </Card>

            {/* Today's Summary */}
            <Card className="border-[#2E7D32]/10">
              <CardHeader>
                <CardTitle className="text-[#1B5E20]">Өнөөдрийн ажил</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#66BB6A]/10 text-center">
                    <div className="text-3xl font-bold text-[#2E7D32] mb-1">
                      {workerTasks.length}
                    </div>
                    <div className="text-sm text-[#5D4037]/70">Даалгавар</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FBC02D]/10 text-center">
                    <div className="text-3xl font-bold text-[#F57C00] mb-1">
                      {completedTasks}
                    </div>
                    <div className="text-sm text-[#5D4037]/70">Дууссан</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tasks */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#1B5E20] px-1">Миний даалгаврууд</h3>
              {workerTasks.slice(0, 3).map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-[#2E7D32]/10 hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#1B5E20] mb-1">{task.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-[#5D4037]/70">
                            <Clock className="w-4 h-4" />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>
                        <Badge className={task.status === 'in-progress' ? 'bg-[#FBC02D]/10 text-[#F57C00] border-[#F57C00]/20' : 'bg-gray-100'}>
                          {task.status === 'in-progress' ? 'Явж байна' : 'Хүлээгдэж байна'}
                        </Badge>
                      </div>

                      <Button 
                        className="w-full rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20]"
                        onClick={() => toast.success('Даалгавар шинэчлэгдлээ')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Дууссан гэж тэмдэглэх
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#1B5E20] px-1">Бүх даалгавар</h3>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-[#2E7D32]/10">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-[#1B5E20]">{task.title}</h4>
                      <Badge className={
                        task.status === 'completed' ? 'bg-[#66BB6A]/10 text-[#2E7D32] border-[#2E7D32]/20' :
                        task.status === 'in-progress' ? 'bg-[#FBC02D]/10 text-[#F57C00] border-[#F57C00]/20' :
                        'bg-gray-100'
                      }>
                        {task.status === 'completed' ? 'Дууссан' : 
                         task.status === 'in-progress' ? 'Явж байна' : 'Хүлээгдэж байна'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#5D4037]/70">
                      <Clock className="w-4 h-4" />
                      <span>{task.dueDate}</span>
                    </div>
                    {task.status !== 'completed' && (
                      <Progress value={task.status === 'in-progress' ? 50 : 0} className="mt-3 h-2" />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#2E7D32]/10 shadow-2xl">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
              activeTab === 'home' 
                ? 'bg-[#2E7D32] text-white' 
                : 'text-[#5D4037]/60 hover:bg-[#F5FBEF]'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Нүүр</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
              activeTab === 'tasks' 
                ? 'bg-[#2E7D32] text-white' 
                : 'text-[#5D4037]/60 hover:bg-[#F5FBEF]'
            }`}
          >
            <List className="w-6 h-6" />
            <span className="text-xs">Даалгавар</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-3 rounded-xl text-[#5D4037]/60 hover:bg-[#F5FBEF] transition-all">
            <Bell className="w-6 h-6" />
            <span className="text-xs">Мэдэгдэл</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-3 rounded-xl text-[#5D4037]/60 hover:bg-[#F5FBEF] transition-all">
            <User className="w-6 h-6" />
            <span className="text-xs">Профайл</span>
          </button>
        </div>
      </div>
    </div>
  );
}
