export default function TrustBar() {
  const brands = ['Nestlé', '47 Street', 'Endado', 'MetLife', 'Banco Security', 'Entel']

  return (
    <section className="py-10 border-y border-white/[0.06]">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-white/30 mb-8">
        Confiaron en mi trabajo
      </p>
      <div className="marquee-container">
        <div className="marquee-content">
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={index}
              className="text-2xl font-semibold text-white/15 hover:text-white/40 transition-colors duration-300 cursor-default whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
