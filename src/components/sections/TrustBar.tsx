export default function TrustBar() {
  const brands = ['Nestlé', '47 Street', 'Endado', 'MetLife', 'Banco Security', 'Entel']

  return (
    <section className="border-y border-neutral-200 bg-white py-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <span className="text-sm text-neutral-500">Trabajé con marcas como:</span>
          {brands.map((brand, index) => (
            <span key={index} className="text-lg font-semibold text-neutral-800">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
