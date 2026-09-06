import { useEffect, useState } from 'react'

// Mantiene el loader en pantalla al menos `ms` para que la animación se llegue a ver
export const useMinLoading = (isLoading: boolean, ms = 1500) => {
  const [elapsed, setElapsed] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setElapsed(true), ms)
    return () => clearTimeout(timeout)
  }, [ms])

  return isLoading || !elapsed
}

const Loader = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center">
      <img src="/images/birds-loader.svg" alt="Cargando" className="w-56 md:w-72" />
    </div>
  )
}

export default Loader
