type Props = {
  id: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export function Section({ id, title, subtitle, children }: Props) {
  return (
    <section id={id} className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-slate-300 mb-8">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
