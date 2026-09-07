import { useEffect, useRef } from 'react'

export function useArchitecturalIntro() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = heroRef.current
    if (!section) return

    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = matchMedia('(min-width: 768px)')
    let abort: AbortController | undefined
    let dispose: (() => void) | undefined

    const stop = () => {
      abort?.abort()
      dispose?.()
      dispose = undefined
      abort = undefined
      section.dataset.heroMode = 'static'
      delete section.dataset.ready
    }

    const start = () => {
      stop()
      if (motion.matches || !desktop.matches) return

      const controller = new AbortController()
      abort = controller

      import('../components/home/architecture/photoExperience')
        .then((module) => {
          if (controller.signal.aborted) return undefined
          return module.createPhotoExperience(section, controller.signal)
        })
        .then((cleanup) => {
          if (controller.signal.aborted) cleanup?.()
          else dispose = cleanup
        })
        .catch(() => {
          if (!controller.signal.aborted) stop()
        })
    }

    start()
    motion.addEventListener('change', start)
    desktop.addEventListener('change', start)

    return () => {
      stop()
      motion.removeEventListener('change', start)
      desktop.removeEventListener('change', start)
    }
  }, [])

  return heroRef
}
