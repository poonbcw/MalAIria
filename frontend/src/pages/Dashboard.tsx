import { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Activity,
  ShieldAlert,
  Cpu,
  History as HistoryIcon,
  ArrowUpRight,
  Search,
} from "lucide-react";

interface AnalysisWithImages {
  id: number;
  modelUsed: string;
  hn?: string | null;
  result: string;
  confidence: number | null;
  createdAt: string | Date;
  images: {
    imageUrl: string;
  }[];
  user?: {
    name: string;
  };
}

const data = [
  { name: "Mon", detections: 400 },
  { name: "Tue", detections: 300 },
  { name: "Wed", detections: 600 },
  { name: "Thu", detections: 800 },
  { name: "Fri", detections: 500 },
  { name: "Sat", detections: 900 },
  { name: "Sun", detections: 1240 },
];

export default function Dashboard() {
  const summary = { total: 1240, malaria: 312, topModel: "YOLOv8" };
  const [history, setHistory] = useState<AnalysisWithImages[]>([]);

  // ดึงข้อมูลเมื่อโหลดหน้าเว็บ
  // useEffect(() => {
  //   fetch("/api/uploads/history") // URL ของ API ที่คุณสร้าง
  //     .then((res) => res.json())
  //     .then((data) => setHistory(data));
  // }, []);
  useEffect(() => {
    fetch("http://localhost:3000/api/history")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setHistory(data))
      // .then((data) => {
      //   console.log("Data from DB:", data); // ดูว่าชื่อฟิลด์ตรงกับที่เราใช้ใน .map() หรือไม่
      //   setHistory(data);
      // })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    /* คุมหน้าจอให้พอดี h-screen และห้ามเลื่อนทั้งหน้า */
    <div className="h-screen bg-[#0f172a] text-slate-200 pt-20 px-8 pb-6 flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        {/* HEADER */}
        <header className="mb-6 flex-none">
          <h1 className="text-xl text-slate-400 pl-2">Analytics Overview</h1>
          {/* <p className="text-sm text-slate-400">Malaria Detection Monitoring System.</p> */}
        </header>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 flex-none">
          <StatCard
            title="Total Detections"
            value={summary.total}
            icon={<Activity size={18} />}
            color="blue"
          />
          <StatCard
            title="Malaria Detected"
            value={summary.malaria}
            icon={<ShieldAlert size={18} />}
            color="red"
          />
          <StatCard
            title="Top Model Used"
            value={summary.topModel}
            icon={<Cpu size={18} />}
            color="cyan"
          />
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 mb-4">
          {/* LEFT: CHART (ลดขนาดลงเหลือ 1/3) */}
          <div className="lg:col-span-1 bg-slate-800/40 border border-white/5 rounded-3xl p-6 backdrop-blur-sm flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-4">Detection Trends</h3>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="detections"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    fill="url(#colorVis)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT: HISTORY (ขยายใหญ่เป็น 2/3 และเลื่อนได้) */}
          <div className="lg:col-span-2 bg-slate-800/40 border border-white/5 rounded-3xl p-6 backdrop-blur-sm flex flex-col h-full min-h-0">
            <div className="flex items-center justify-between mb-4 flex-none">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <HistoryIcon size={18} className="text-cyan-400" /> Recent
                History
              </h3>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl px-3 py-1 flex items-center gap-2 text-xs">
                <Search size={14} className="text-slate-500" />
                <input
                  type="text"
                  placeholder="Search HN..."
                  className="bg-transparent outline-none w-24"
                />
              </div>
            </div>

            {/* กล่องประวัติที่ Scroll ได้ */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {history.map((item) => {
                // ตรวจสอบและจัดการ URL รูปภาพ
                const rawUrl = item.images?.[0]?.imageUrl;
                // หาก imageUrl เริ่มต้นด้วย / ให้เติมพอร์ตของ Backend (เช่น 3000)
                // หากเป็น https (Cloud) ให้ใช้ตามปกติ
                const displayImageUrl = rawUrl?.startsWith("/")
                  ? `http://localhost:3000${rawUrl}`
                  : rawUrl || "/placeholder-image.png";

                return (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() =>
                      console.log("Navigate to details of:", item.id)
                    }
                  >
                    <div className="flex items-center gap-4">
                      {/* ส่วนแสดงรูปภาพ */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:scale-110 transition-transform bg-slate-800">
                        <img
                          src={displayImageUrl}
                          alt="blood smear"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-image.png";
                          }}
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">
                            {item.user?.name || `Patient #${item.id}`}
                          </p>
                          <span className="text-[10px] text-slate-500 font-mono bg-slate-900 px-1 rounded">
                            {item.hn ? `HN-${item.hn}` : "NO HN"}
                          </span>
                        </div>
                        {/* ดึงค่า modelUsed และ Format วันที่ */}
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.modelUsed || "Unknown Model"} •{" "}
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString(
                                "th-TH",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "No Date"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {/* แสดงผล Positive/Negative */}
                        <p
                          className={`text-xs font-bold ${item.result === "Positive" ? "text-red-400" : "text-emerald-400"}`}
                        >
                          {item.result || "N/A"}
                        </p>
                        {/* แสดงค่า Confidence เป็น % */}
                        <p className="text-[10px] text-slate-500">
                          {item.confidence
                            ? `Conf: ${(Number(item.confidence) * 100).toFixed(1)}%`
                            : "No Conf Data"}
                        </p>
                      </div>
                      <div className="p-2 rounded-full bg-white/5 text-slate-400 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const colorMap: any = {
    blue: "from-blue-500/20 to-transparent border-blue-500/20 text-blue-400",
    red: "from-red-500/20 to-transparent border-red-500/20 text-red-400",
    cyan: "from-cyan-500/20 to-transparent border-cyan-500/20 text-cyan-400",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} border rounded-3xl p-5 backdrop-blur-md`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="p-2 bg-slate-900/50 rounded-lg text-white">
          {icon}
        </span>
      </div>
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}
