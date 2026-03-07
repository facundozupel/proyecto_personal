export default function TrustBar() {
  const brands = ['Nestlé', '47 Street', 'Endado', 'MetLife', 'Banco Security', 'Entel']

  return (
    <section className="py-10 border-y border-black/[0.06]">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-black/25 mb-8">
        Confiaron en mi trabajo
      </p>
      <div className="marquee-container">
        <div className="marquee-content">
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={index}
              className="text-2xl font-semibold text-black/10 hover:text-black/35 transition-colors duration-300 cursor-default whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
