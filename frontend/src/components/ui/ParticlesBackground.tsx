import { useEffect, useRef } from "react"
import { ParticlesProvider, Particles } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Container, Engine } from "@tsparticles/engine"

const initParticles = async (engine: Engine) => {
  await loadSlim(engine)
}

const ParticlesBackground = () => {
  // tsparticles carga el canvas de forma asíncrona; si el componente ya se
  // desmontó cuando termina de cargar, no encuentra su div y crea uno nuevo
  // suelto en <body> que nunca se limpia. Este ref detecta ese caso y lo
  // destruye apenas termina de cargar.
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return (
    <ParticlesProvider init={initParticles}>
      <Particles
        className="absolute inset-0"
        particlesLoaded={(container?: Container) => {
          if (!isMountedRef.current) {
            container?.destroy()
          }
        }}
        options={{
          background: { color: "transparent" },
          fullScreen: { enable: false },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" }
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 }
            }
          },
          particles: {
            shape: { type: "circle" },
            color: { value: "#f9ec70" },
            links: { enable: false },
            move: {
              enable: true,
              speed: { min: 0.5, max: 0.6 },
              direction: "top",
              outModes: { default: "out", bottom: "none" },
              straight: false
            },
            number: { value: 100, density: { enable: true } },
            opacity: {
              value: { min: 0.1, max: 0.5 },
              animation: { enable: true, speed: 0.5, sync: false, startValue: "random" }
            },
            size: { value: { min: 30, max: 60 } },
            stroke: { width: 1, color: { value: "#ffffff" } }
          }
        }}
      />
    </ParticlesProvider>
  )
}

export default ParticlesBackground
