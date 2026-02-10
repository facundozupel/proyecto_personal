export function CtaScheduleCall() {
  return (
    <div className="bg-[#0070F3]/10 border border-[#0070F3]/20 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-white/80">
        <strong className="text-white">Querés una auditoría SEO completa?</strong>{' '}
        Agenda una llamada con Facundo.
      </p>
      <button
        data-open-contact
        className="px-5 py-2 bg-[#0070F3] text-white text-sm font-semibold rounded-lg hover:bg-[#005AC8] transition-all duration-200 whitespace-nowrap cursor-pointer"
      >
        Agendar llamada
      </button>
    </div>
  );
}
