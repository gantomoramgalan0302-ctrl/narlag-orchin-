import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { motion } from 'motion/react';
import { Upload, FileText, Download, Eye, Search, Folder, File } from 'lucide-react';
import { documents } from '../../data/mockData';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/20';
      case 'design': return 'bg-[#66BB6A]/10 text-[#66BB6A] border-[#66BB6A]/20';
      case 'tender': return 'bg-[#FBC02D]/10 text-[#F57C00] border-[#F57C00]/20';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'contract': return 'Гэрээ';
      case 'design': return 'Дизайн';
      case 'tender': return 'Тендер';
      default: return 'Бусад';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1B5E20] mb-2">Баримт бичгийн сан</h1>
            <p className="text-[#5D4037]/70">Дижитал баримт бичгийн удирдлага</p>
          </div>
          <Button className="rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20]">
            <Upload className="w-5 h-5 mr-2" />
            Файл оруулах
          </Button>
        </div>

        {/* Storage Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="border-[#2E7D32]/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Folder className="w-8 h-8 text-[#2E7D32]" />
                <p className="text-sm text-[#5D4037]/70">Нийт файл</p>
              </div>
              <p className="text-3xl font-bold text-[#1B5E20]">{documents.length}</p>
            </CardContent>
          </Card>

          <Card className="border-[#2E7D32]/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <File className="w-8 h-8 text-[#2E7D32]" />
                <p className="text-sm text-[#5D4037]/70">Нийт хэмжээ</p>
              </div>
              <p className="text-3xl font-bold text-[#1B5E20]">9.4 MB</p>
            </CardContent>
          </Card>

          <Card className="border-[#66BB6A]/20 bg-gradient-to-br from-white to-[#66BB6A]/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-8 h-8 text-[#66BB6A]" />
                <p className="text-sm text-[#5D4037]/70">Энэ сард</p>
              </div>
              <p className="text-3xl font-bold text-[#2E7D32]">+3</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-[#2E7D32]/10">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5D4037]/40" />
                <Input
                  placeholder="Баримт хайх..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-[#2E7D32]/20"
                />
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48 rounded-xl border-[#2E7D32]/20">
                  <SelectValue placeholder="Төрөл" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүгд</SelectItem>
                  <SelectItem value="contract">Гэрээ</SelectItem>
                  <SelectItem value="design">Дизайн</SelectItem>
                  <SelectItem value="tender">Тендер</SelectItem>
                  <SelectItem value="other">Бусад</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-[#2E7D32]/10 hover:shadow-xl transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#1B5E20] mb-1 truncate group-hover:text-[#2E7D32] transition-colors">
                        {doc.name}
                      </h4>
                      <Badge className={getTypeColor(doc.type)}>
                        {getTypeText(doc.type)}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-[#5D4037]/70">
                    <div className="flex items-center justify-between">
                      <span>Хэмжээ:</span>
                      <span className="font-medium text-[#1B5E20]">{doc.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Огноо:</span>
                      <span className="font-medium text-[#1B5E20]">{doc.uploadDate}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-[#2E7D32]/10">
                    <Button variant="outline" size="sm" className="flex-1 rounded-lg border-[#2E7D32]/20 hover:bg-[#F5FBEF]">
                      <Eye className="w-4 h-4 mr-1" />
                      Үзэх
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 rounded-lg border-[#2E7D32]/20 hover:bg-[#F5FBEF]">
                      <Download className="w-4 h-4 mr-1" />
                      Татах
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <Card className="border-[#2E7D32]/10">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto text-[#2E7D32]/20 mb-4" />
              <p className="text-[#5D4037]/60">Баримт олдсонгүй</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
