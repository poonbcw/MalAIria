import { Section } from "../components/Section";
import { Roadmap } from "../components/Roadmap";
import { Link } from "react-router-dom";

import bgImage from "../assets/bgg.png";
import logoSvg from "../assets/name.svg";

export default function Home() {
  return (
    <main>
      <section
        id="home"
        className="relative min-h-screen flex items-center bg-[#122231] overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "55%", // ขนาดภาพ
          backgroundPosition: "left top", // หรือ "0% 0%"
        }}
      >
        <div className="max-w-xl mx-auto px-6 mr-40">
          <div
            className="h-24 mb-6 w-256 bg-white" // เปลี่ยน bg-white เป็นสีที่ต้องการ เช่น bg-cyan-400
            style={{
              maskImage: `url(${logoSvg})`,
              WebkitMaskImage: `url(${logoSvg})`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
          <h1 className="text-xl font-bold">
            AI-powered Malaria Detection
          </h1>
          <p className="text-slate-300 mb-6">
            Detect malaria parasites from blood smear images.
          </p>
          <Link to="/analyze">
            <button className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <Section
        id="story"
        title="Our Story"
        subtitle="Malaria is a life-threatening disease transmitted by infected mosquitoes."
      />

      <Section
        id="goal"
        title="Our Goal"
        subtitle="To assist medical professionals with fast, reliable, and accessible malaria diagnosis."
      />

      <Section id="product" title="Product">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4">Website</h3>
            <p className="text-slate-300">
              Browser-based AI system for blood smear analysis.
            </p>
          </div>
          <div className="bg-slate-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4">Application</h3>
            <p className="text-slate-300">
              Portable AI assistant for low-resource environments.
            </p>
          </div>
        </div>
      </Section>

      <Section id="service" title="Service">
        <Roadmap />
      </Section>

      <Section id="contact" title="Contact">
        <p className="text-slate-300">Email: contact@malairia.ai</p>
      </Section>
    </main>
  );
}
