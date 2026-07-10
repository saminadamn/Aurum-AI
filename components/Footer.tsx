export default function Footer() {
  return (
    <footer className="mt-10 pt-6 border-t border-zinc-200 flex justify-between items-center opacity-40 grayscale font-sans">
      <div className="flex gap-10 text-[9px] font-black uppercase tracking-widest">
        <span>&copy; {new Date().getFullYear()} Aurum Intelligence</span>
        <span>ISO 27001 Certified</span>
        <span>GDPR Compliant Audit</span>
      </div>
      <p className="text-[9px] font-bold italic tracking-tighter">Powered by AURUM Cost Optimization Engine</p>
    </footer>
  );
}
