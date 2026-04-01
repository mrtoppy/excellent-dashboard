import { useState } from 'react';
import { 
  MessageSquare, 
  Truck, 
  Users, 
  Droplet, 
  BookOpen, 
  QrCode, 
  Search,
  FileText,
  AlertCircle,
  PackageCheck,
  PodcastIcon,
  SheetIcon
} from 'lucide-react';

// ข้อมูลเมนูต่างๆ (สามารถเพิ่ม/ลบ/แก้ไข ตรงนี้ได้เลย)
const menuItems = [
  {
    id: 1,
    title: 'ระบบ 301 Online (ใหม่)',
    description: 'ระบบติดตามและดาวน์โหลด ป.301 ออนไลน์',
    icon: FileText,
    color: 'bg-blue-500',
    link: 'https://script.google.com/macros/s/AKfycbx6FePKk2yAWY1xQZ1ejUV6JtitqVVIv0fxXgXsydmb13LegYCRmyPYk2vQRMmUNgcv/exec' // ใส่ลิงก์ไปยังหน้านั้นๆ ตรงนี้
  },
  {
    id: 2,
    title: 'รายงาน Morning Talk',
    description: 'สรุปข้อมูลและรายงานการประชุม Morning Talk',
    icon: MessageSquare,
    color: 'bg-orange-500',
    link: 'https://script.google.com/macros/s/AKfycbzaK3fhjo66iSeD5zv5ssJgNaP2hlXeGhztqAuaoI9dMKgsG-Jd544cTJ6oVmiQO7D-/exec'
  },
  {
    id: 3,
    title: 'ผลการนำจ่าย EMS',
    description: 'Dashboard สรุปผลการปฏิบัติงานนำจ่ายด่วนพิเศษ',
    icon: PackageCheck,
    color: 'bg-green-500',
    link: 'https://lookerstudio.google.com/reporting/9a4c3b02-b741-4dd5-8ee2-e070b4510e6d'
  },
  {
    id: 4,
    title: 'รายงานรถขนส่งถุง',
    description: 'ติดตามสถานะและรายงานรถขนส่งไปรษณีย์',
    icon: Truck,
    color: 'bg-red-500',
    link: 'https://script.google.com/macros/s/AKfycbz3WtFYTvgLknhpcumllSFmJQWyrOrgGWIWBYOYJyU2GOU8uJiLVR85UsXwALMq5D8d/exec'
  },
  {
    id: 5,
    title: 'แบบวิเคราะห์อัตรากำลัง',
    description: 'ข้อมูลวิเคราะห์การจัดสรรบุคลากรในหน่วยงาน',
    icon: Users,
    color: 'bg-purple-500',
    link: 'https://sites.google.com/thailandpost.com/excellentdashboard/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%A7%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%B0%E0%B8%AB%E0%B8%AD%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%B3%E0%B8%A5%E0%B8%87'
  },
  {
    id: 6,
    title: 'วิเคราะห์น้ำมันนำจ่าย',
    description: 'สถิติและอัตราการสิ้นเปลืองเชื้อเพลิง',
    icon: Droplet,
    color: 'bg-yellow-500',
    link: 'https://lookerstudio.google.com/reporting/919b8b4a-cce8-4e05-a8ea-7f7411583351'
  },
  {
    id: 7,
    title: 'คู่มือปฏิบัติงาน ศป.อย.',
    description: 'เอกสารอ้างอิงและขั้นตอนการปฏิบัติงาน',
    icon: BookOpen,
    color: 'bg-teal-500',
    link: 'https://sites.google.com/thailandpost.com/ay-mail-center?usp=sharing'
  },
  // {
  //   id: 8,
  //   title: 'พิกัดจุดจ่าย',
  //   description: 'แผนที่และข้อมูลพิกัดจุดนำจ่ายไปรษณีย์',
  //   icon: MapPin,
  //   color: 'bg-rose-500',
  //   link: '#'
  // },
  {
    id: 9,
    title: 'สร้าง QR Code',
    description: 'เครื่องมือสร้าง QR Code สำหรับใช้งานภายใน',
    icon: QrCode,
    color: 'bg-slate-700',
    link: 'https://script.google.com/macros/s/AKfycbyNNP4ajss0K0WKVHj9bx1V5NeZIFrS1Ov9T0ufR4_UZHbCHAtwjCnJQ3pfW0BKImGm/exec'
  },
  // {
  //   id: 10,
  //   title: 'แจ้งปรับปรุงข้อมูล PDS',
  //   description: 'ระบบแจ้งแก้ไขและปรับปรุงฐานข้อมูล',
  //   icon: AlertCircle,
  //   color: 'bg-indigo-500',
  //   link: '#'
  // }
  {
  id: 9,
  title: 'รายงานจุดติดตั้งและทำความสะอาดตู้ไปรษณีย์',
  description: 'สำหรับรายงานทำความสะอาดและจุดติดตั้งตู้ไปรษณีย์',
  icon: PodcastIcon,
  color: 'bg-red-500',
  link: 'https://www.appsheet.com/start/c8bf2f50-b11e-4452-b96c-a16e64c7c670'
  },
  {
  id: 9,
  title: 'Google Sheet ปิดถุงวิงค์ไวท์(บ้านหมี่)',
  description: 'เครื่องมือสร้าง QR Code สำหรับปิดถุงชิ้นงานวิงค์ไวท์ของ ปณ.บ้านหมี่',
  icon: SheetIcon,
  color: 'bg-green-700',
  link: 'https://docs.google.com/spreadsheets/d/1l1cyhehNDsYluSIvUELMuupNZRegFAVicANQwVbXue0/edit?usp=sharing'
  },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // ฟังก์ชันค้นหาเมนู
  const filteredMenus = menuItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              {/* โลโก้สมมติ (แทนที่ด้วยภาพโลโก้ไปรษณีย์ไทยได้) */}
              <div className="w-15 h-15 rounded-lg flex items-center justify-center shadow-md bg-white p-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/ThailandPost_Logo_%282021%29.svg/3840px-ThailandPost_Logo_%282021%29.svg.png"
                  alt="Thailand Post"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                Excellent <span className="text-red-600">Dashboards</span>
              </h1>
            </div>
            <div className="hidden md:block">
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                ระบบจัดการข้อมูลภายใน
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section & Search */}
      <div className="bg-gradient-to-br from-red-600 to-red-800 pb-24 pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            ยินดีต้อนรับสู่ศูนย์รวมรายงาน ปข.1
          </h2>
          <p className="mt-4 text-lg text-red-100 max-w-2xl mx-auto">
            เข้าถึง Dashboard สถิติ และระบบงานต่างๆ ของหน่วยงานได้อย่างรวดเร็วในที่เดียว
          </p>
          
          {/* ช่องค้นหา */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 rounded-full border-0 focus:ring-4 focus:ring-red-400/50 shadow-lg text-slate-900 placeholder-slate-400 sm:text-lg transition-all"
              placeholder="ค้นหารายงานที่ต้องการ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Cards Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-12">
        {filteredMenus.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMenus.map((item) => {
              const Icon = item.icon;
              return (
                <a 
                  key={item.id} 
                  href={item.link}
                  target="_blank"                   // <--- เพิ่มบรรทัดนี้
                  rel="noopener noreferrer"         // <--- เพิ่มบรรทัดนี้
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-semibold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    เข้าสู่ระบบ <span className="ml-1 text-lg">→</span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <AlertCircle className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">ไม่พบเมนูที่ค้นหา</h3>
            <p className="mt-1 text-slate-500">ลองใช้คำค้นหาอื่นดูอีกครั้ง</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          <p>© 2026 Excellent Dashboards. พัฒนาสำหรับใช้งานภายในหน่วยงานโดย ส่วนระบบไปรษณีย์และสารสนเทศ ปข.1</p>
        </div>
      </footer>
    </div>
  );
}
