import { useEffect, useState } from "react"
import { longDateFormatter, timeFormatter } from "../../utils/date"

const LiveClock = () => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6 text-center md:py-10">
      <span className="grid size-16 place-items-center rounded-full bg-secondary/10 text-secondary md:size-20">
        <i className="bi bi-clock text-3xl md:text-4xl"></i>
      </span>
      <p className="mt-1 text-4xl font-semibold text-ink md:text-6xl">{timeFormatter.format(now)}</p>
      <p className="text-base font-normal capitalize text-ink/60 md:text-lg">{longDateFormatter.format(now)}</p>
    </div>
  )
}

export default LiveClock
