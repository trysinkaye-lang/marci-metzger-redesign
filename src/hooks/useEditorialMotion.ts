import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useEditorialMotion() {
  useEffect(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference) and (min-width: 48rem)', () => {
      const context = gsap.context(() => {
        gsap.from('.hero-overline', {
          opacity: 0,
          y: 12,
          duration: 0.6,
          ease: 'power2.out',
        })

        gsap.from('.hero-editorial h1 span', {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        })

        gsap.fromTo(
          '.hero-image',
          { scale: 1.015, yPercent: 0 },
          {
            scale: 1.045,
            yPercent: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero-editorial',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        )

        gsap.fromTo(
          '.search-story > img',
          { scale: 1, yPercent: 1 },
          {
            scale: 1.025,
            yPercent: -1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.search-story',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        )

        gsap.fromTo(
          '.seller-media img',
          { scale: 1.015, yPercent: 1 },
          {
            scale: 1.045,
            yPercent: -1.5,
            ease: 'none',
            scrollTrigger: {
              trigger: '.seller-cinematic',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        )
      })

      return () => context.revert()
    })

    return () => media.revert()
  }, [])
}
