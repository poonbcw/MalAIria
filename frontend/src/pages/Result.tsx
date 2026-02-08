import { useLocation } from "react-router-dom";

export default function Result() {
  const location = useLocation();

  // รับค่าจาก state ที่ส่งมาจากหน้า Analyze
  const { selectedImage, selectedModel, hn, status } = location.state || {};

  // กำหนดสีตามสถานะ (เขียวสำหรับ Negative, แดงสำหรับ Positive)
  const statusColor = status === "POSITIVE" ? "text-red-500" : "text-[#22c55e]";
  const subText =
    status === "POSITIVE" ? "PARASITE DETECTED" : "NO ABNORMALITY FOUND";

  return (
    <section className="min-h-screen bg-[#0f172a] flex items-center justify-center p-10">
      <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl w-full pt-12">
        {/* ฝั่งซ้าย: แสดงรูปที่ส่งมาจากหน้า Analyze */}
        <div className="flex-1 flex justify-center">
          <div className="relative group">
            <img
              className="w-[550px] h-[570px] object-cover shadow-2xl border-4 border-white/10"
              src={selectedImage}
              alt="Analysis"
            />
          </div>
        </div>

        {/* ฝั่งขวา: ข้อมูลตามโมเดลและรูปที่เลือก */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-gray-400 uppercase tracking-widest text-sm mb-2">
            Diagnostic Status
          </span>

          <h1
            className={`text-7xl font-black ${statusColor} mb-2 transition-all`}
          >
            {status}
          </h1>

          <p className="text-xl text-gray-400 font-medium mb-10">{subText}</p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-[#1e293b] p-6 rounded-2xl border border-white/5 shadow-inner">
              <p className="text-xs text-gray-500 uppercase mb-1">HN</p>
              <p className="text-xl font-semibold text-white">{hn}</p>
            </div>
            <div className="bg-[#1e293b] p-6 rounded-2xl border border-white/5 shadow-inner">
              <p className="text-xs text-gray-500 uppercase mb-1">Model Used</p>
              <p className="text-xl font-semibold text-white">
                {selectedModel}
              </p>
            </div>
          </div>

          <button
            onClick={() => window.history.back()}
            className="mt-12 w-full max-w-md py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors uppercase"
          >
            Back to Analysis
          </button>
        </div>
      </div>
    </section>
  );
}
