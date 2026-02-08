const steps = [
  {
    id: "01",
    title: "Capture Image",
    desc: "Take a blood smear photo via microscope or phone",
  },
  {
    id: "02",
    title: "Upload / Scan",
    desc: "Upload via website or mobile application",
  },
  {
    id: "03",
    title: "AI Analysis",
    desc: "AI detects malaria parasites within seconds",
  },
  {
    id: "04",
    title: "View Results",
    desc: "Clear and easy-to-read diagnostic report",
  },
  {
    id: "05",
    title: "Take Action",
    desc: "Support treatment decisions and patient outcomes",
  },
];

export function Roadmap() {
  return (
    <div className="relative border-l border-slate-600 ml-4">
      {steps.map((s) => (
        <div key={s.id} className="ml-8 mb-16">
          <div className="absolute -left-3 w-6 h-6 rounded-full bg-cyan-400" />
          <span className="text-cyan-400 font-bold">{s.id}</span>
          <h4 className="text-xl font-semibold mt-2">{s.title}</h4>
          <p className="text-slate-300 max-w-md">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
