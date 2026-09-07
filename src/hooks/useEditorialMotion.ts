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
          y: 18,
          duration: 0.7,
          ease: 'power2.out',
        })

        gsap.from('.hero-editorial h1 span', {
          opacity: 0,
          y: 38,
          duration: 0.95,
          stagger: 0.1,
          ease: 'power3.out',
        })

        gsap.from('.hero-bottom-rail', {
          opacity: 0,
          y: 18,
          duration: 0.8,
          delay: 0.18,
          ease: 'power2.out',
        })

        gsap.fromTo(
          '.hero-image',
          { scale: 1.025, yPercent: 0 },
          {
            scale: 1.075,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero-editorial',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        )

        gsap.from('.performance-section', {
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.performance-section',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.local-interlude-words > *', {
          opacity: 0,
          yPercent: 28,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.local-interlude',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.portrait-frame img', {
          clipPath: 'inset(8% 0 10% 0)',
          scale: 1.035,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.about-copy > *', {
          opacity: 0,
          y: 24,
          duration: 0.75,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-copy',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.fromTo(
          '.search-story > img',
          { scale: 0.985, yPercent: 2 },
          {
            scale: 1.045,
            yPercent: -2,
            ease: 'none',
            scrollTrigger: {
              trigger: '.search-story',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )

        gsap.from('.search-story-copy > *', {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.search-story',
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.fromTo(
          '.seller-media img',
          { scale: 1.03, yPercent: 2 },
          {
            scale: 1.09,
            yPercent: -3,
            ease: 'none',
            scrollTrigger: {
              trigger: '.seller-cinematic',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        )

        gsap.from('.seller-copy > *', {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.seller-copy',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.buyer-property', {
          opacity: 0,
          xPercent: -5,
          y: 24,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.buyer-section',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.buyer-detail', {
          opacity: 0,
          xPercent: 8,
          yPercent: 10,
          duration: 0.95,
          delay: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.buyer-section',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.buyer-copy > *', {
          opacity: 0,
          y: 22,
          duration: 0.72,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.buyer-copy',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.utils.toArray<HTMLElement>('.service-row').forEach((row) => {
          const mediaEl = row.querySelector<HTMLElement>('.service-media')
          const copyEl = row.querySelector<HTMLElement>('.service-copy')

          if (mediaEl) {
            gsap.from(mediaEl, {
              clipPath: 'inset(0 0 14% 0)',
              opacity: 0.92,
              duration: 0.95,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            })
          }

          if (copyEl) {
            gsap.from(copyEl.children, {
              opacity: 0,
              y: 20,
              duration: 0.7,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            })
          }
        })

        gsap.from('.contact-heading > *', {
          opacity: 0,
          y: 26,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      return () => context.revert()
    })

    return () => media.revert()
  }, [])
}
