export function CtaScheduleCall() {
  return (
    <div className="bg-[#BF551A]/10 border border-[#BF551A]/20 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-white/80">
        <strong className="text-white">Querés una auditoría SEO completa?</strong>{' '}
        Agenda una llamada con Facundo.
      </p>
      <button
        data-open-contact
        className="px-5 py-2 bg-[#BF551A] text-white text-sm font-semibold rounded-lg hover:bg-[#A04716] transition-all duration-200 whitespace-nowrap cursor-pointer"
      >
        Agendar llamada
      </button>
    </div>
  );
}
