'use client'
import { useEffect, useRef, useState } from 'react'

function parse(val: string): { prefix: string; num: number; suffix: string } {
  const m = val.match(/^([^0-9]*)([0-9]+\.?[0-9]*)(.*)$/)
  if (!m) return { prefix: '', num: 0, suffix: val }
  return { prefix: m[1], num: parseFloat(m[2]), suffix: m[3] }
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState('0')
  const { prefix, num, suffix } = parse(value)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const duration = 1800
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - t, 3)
        const cur = num < 10 ? +(eased * num).toFixed(1) : Math.round(eased * num)
        setDisplay(`${prefix}${cur}${suffix}`)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [num, prefix, suffix])

  return <span ref={ref} className={className}>{display}</span>
}
