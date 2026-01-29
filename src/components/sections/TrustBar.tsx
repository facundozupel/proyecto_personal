export default function TrustBar() {
  const brands = ['Nestlé', '47 Street', 'Endado', 'MetLife', 'Banco Security', 'Entel']

  return (
    <section className="py-8 bg-white/[0.02] border-y border-white/5 overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
        Confían en mi trabajo
      </p>
      <div className="marquee-container">
        <div className="marquee-content">
          {/* Duplicamos para el loop infinito */}
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={index}
              className="text-2xl font-display font-bold text-white/20 hover:text-white/50 transition-all duration-300 hover:scale-110 cursor-default whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
