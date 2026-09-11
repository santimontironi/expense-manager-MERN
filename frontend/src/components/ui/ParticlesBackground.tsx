import { ParticlesProvider, Particles } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine } from "@tsparticles/engine"

const initParticles = async (engine: Engine) => {
  await loadSlim(engine)
}

const ParticlesBackground = () => {
  return (
    <ParticlesProvider init={initParticles}>
      <Particles
        className="absolute inset-0"
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
