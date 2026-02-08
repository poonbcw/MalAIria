import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
  CloudUpload,
  UserCircle,
  RefreshCcw,
  ChevronDown,
  Check,
} from "lucide-react";

const Analyze = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hnNumber, setHnNumber] = useState("");

  // Custom Dropdown State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("YOLOv8 (deeplearning)");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const models = [
    "YOLOv8 (deeplearning)",
    "Fast R-CNN (deeplearning)",
    "random forest (ML)",
    "XGBoost (ML)",
  ];

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedImage) return alert("Please upload an image first");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("model", selectedModel);
      formData.append("hn", hnNumber);
      if (user) formData.append("userId", user.id);

      // ส่งไปยัง API Backend (สมมติว่ารันอยู่ที่ port 5000)
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server Error");

      const resultData = await response.json();

      setLoading(false);
      navigate("/result", {
        state: {
          analysisId: resultData.id,
          selectedImage: `http://localhost:3000${resultData.images[0].imageUrl}`,
          selectedModel: resultData.modelUsed,
          hn: hnNumber || "Guest",
          status: resultData.result.toUpperCase(),
          confidence: resultData.confidence,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Failed to analyze image");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-900 text-slate-100 pt-16 flex flex-col overflow-hidden font-sans">
      <div className="flex-1 w-full max-w-xl mx-auto px-6 py-4 flex flex-col justify-center min-h-0">
        {/* <div className="text-center mb-6 flex-none">
          <h1 className="text-[10px] font-bold tracking-[0.2em] text-cyan-500 uppercase">Analyze</h1>
        </div> */}

        <div className="space-y-5 flex-none">
          {/* STEP 1: TARGET IMAGE */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Target Image
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative h-40 md:h-44 w-full bg-slate-800/40 border-2 border-dashed border-slate-700 rounded-[1.5rem] overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all flex items-center justify-center group"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover opacity-80"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <CloudUpload size={28} className="mb-2" />
                  <p className="text-[10px] font-semibold tracking-wide uppercase">
                    Tap to upload
                  </p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* STEP 2: CUSTOM AI ANALYSIS MODEL DROPDOWN */}
          <div className="space-y-2" ref={dropdownRef}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              AI Analysis Model
            </label>
            <div className="relative">
              {/* Box ตัวหลัก */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-slate-800/40 border ${
                  isOpen ? "border-cyan-500/50" : "border-slate-700"
                } rounded-2xl py-4 px-6 text-sm flex justify-between items-center transition-all hover:bg-slate-800/60`}
              >
                <span
                  className={selectedModel ? "text-white" : "text-slate-500"}
                >
                  {selectedModel}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-slate-500 transition-transform ${
                    isOpen ? "rotate-180 text-cyan-400" : ""
                  }`}
                />
              </button>

              {/* รายการที่เด้งลงมา (Menu) */}
              {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#1e293b] border border-slate-700 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {models.map((model) => (
                    <div
                      key={model}
                      onClick={() => {
                        setSelectedModel(model);
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-between px-6 py-4 hover:bg-cyan-500/10 cursor-pointer group transition-colors"
                    >
                      <span
                        className={`text-sm ${
                          selectedModel === model
                            ? "text-cyan-400 font-bold"
                            : "text-slate-300"
                        }`}
                      >
                        {model}
                      </span>
                      {selectedModel === model && (
                        <Check size={16} className="text-cyan-400" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* STEP 3: PATIENT IDENTIFICATION */}
          <div className="min-h-[90px]">
            {user ? (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Patient Identification
                </label>
                <div className="relative">
                  <UserCircle
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="HN Number (optional)"
                    value={hnNumber}
                    onChange={(e) => setHnNumber(e.target.value)}
                    className="w-full bg-slate-800/40 border border-slate-700 rounded-2xl py-4 pl-14 pr-5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold leading-relaxed">
                  Guest Mode: Analysis results <br /> will not be saved.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER BUTTON */}
        <div className="mt-8 flex-none">
          <button
            onClick={handleStartAnalysis}
            disabled={loading || !selectedImage}
            className={`w-full py-4.5 rounded-full font-black tracking-[0.15em] flex items-center justify-center gap-3 transition-all ${
              loading || !selectedImage
                ? "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700"
                : "bg-white text-slate-900 hover:bg-cyan-400 active:scale-95 shadow-xl shadow-cyan-500/10"
            }`}
          >
            {loading ? (
              <RefreshCcw className="animate-spin" size={20} />
            ) : (
              "START ANALYSIS"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
