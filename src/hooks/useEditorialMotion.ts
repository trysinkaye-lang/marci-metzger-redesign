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

        const aboutTrigger = {
          trigger: '.about-profile',
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        }

        gsap.from('.about-profile-image-mask', {
          clipPath: 'inset(0 0 16% 0)',
          opacity: 0.7,
          y: 28,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: aboutTrigger,
        })

        gsap.from('.about-profile-image-mask img', {
          scale: 1.055,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: aboutTrigger,
        })

        gsap.from('.about-profile-heading h2 span', {
          opacity: 0,
          y: 34,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: aboutTrigger,
        })

        gsap.from('.about-profile-role, .about-profile-story, .about-profile-actions, .about-profile-detailbar', {
          opacity: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: aboutTrigger,
        })

        gsap.from('.about-profile-rule', {
          scaleX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: aboutTrigger,
        })

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
