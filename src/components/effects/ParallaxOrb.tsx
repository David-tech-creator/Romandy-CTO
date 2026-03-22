'use client'
import { useEffect, useRef } from 'react'

interface Props {
  className?: string
  style?: React.CSSProperties
  speed?: number
}

export function ParallaxOrb({ className, style, speed = 0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      ref.current.style.transform = `translateY(${window.scrollY * speed}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return <div ref={ref} className={className} style={style} />
}
