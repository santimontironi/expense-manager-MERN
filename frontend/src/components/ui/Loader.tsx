const Loader = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center">
      <img src="/images/birds-loader.svg" alt="Cargando" className="w-56 md:w-72" />
    </div>
  )
}

export default Loader
