import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useBuyerJourneyMotion() {
  useEffect(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference) and (min-width: 48rem)', () => {
      const context = gsap.context(() => {
        gsap.from('.buyer-journey-heading', {
          opacity: 0,
          y: 26,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.buyer-journey-intro',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.buyer-journey-intro-copy', {
          opacity: 0,
          y: 20,
          duration: 0.75,
          delay: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.buyer-journey-intro',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        const expandTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.buyer-expand-stage',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        })

        expandTimeline
          .fromTo(
            '.buyer-expand-frame',
            { clipPath: 'inset(8% 11% 8% 11%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' },
            0,
          )
          .fromTo(
            '.buyer-expand-image',
            { scale: 1.08 },
            { scale: 1.015, ease: 'none' },
            0,
          )

        gsap.from('.buyer-handoff-image', {
          opacity: 0,
          x: -34,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.buyer-handoff',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.buyer-handoff-copy', {
          opacity: 0,
          y: 24,
          duration: 0.8,
          delay: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.buyer-handoff',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      return () => context.revert()
    })

    return () => media.revert()
  }, [])
}
