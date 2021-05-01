import { useEffect, useState, useRef } from 'react'

/**
 * Use Intersection Observer API
 */
export default function useIntersection(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (observer && ref && ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting
}

/**
 * Callback once, the first time that the ref is visible
 */
export function useOnVisible(rootMargin, callback = () => {}) {
  const ref = useRef(null)
  const firstTime = useRef(true)
  const isIntersecting = useIntersection(ref, rootMargin)

  useEffect(() => {
    if (firstTime.current && isIntersecting) {
      firstTime.current = false
      callback()
    }
  }, [callback, isIntersecting])

  return [ref, isIntersecting]
}
