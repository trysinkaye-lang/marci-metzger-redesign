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
          y: 14,
          duration: 0.65,
          ease: 'power2.out',
        })

        gsap.from('.hero-motion h1 span', {
          opacity: 0,
          y: 34,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
        })

        gsap.from('.hero-bottom-rail', {
          opacity: 0,
          y: 18,
          duration: 0.75,
          delay: 0.18,
          ease: 'power2.out',
        })

        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero-motion',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.05,
            invalidateOnRefresh: true,
          },
        })

        heroTimeline
          .to('.hero-motion-frame', {
            clipPath: 'inset(0rem 0vw 0rem 0vw)',
            ease: 'none',
          }, 0)
          .to('.hero-motion-frame .hero-image', {
            scale: 1.085,
            yPercent: 2.6,
            ease: 'none',
          }, 0)
          .to('.hero-motion h1 span:first-child', {
            xPercent: -4,
            ease: 'none',
          }, 0)
          .to('.hero-motion h1 span:last-child', {
            xPercent: 6,
            ease: 'none',
          }, 0)
          .to('.hero-motion-copy', {
            yPercent: -7,
            ease: 'none',
          }, 0)
          .to('.hero-bottom-rail', {
            opacity: 0.18,
            y: 24,
            ease: 'none',
          }, 0.55)
          .to('.hero-location, .hero-overline', {
            opacity: 0.28,
            ease: 'none',
          }, 0.42)
          .to('.hero-motion-scroll-cue', {
            opacity: 0,
            y: 16,
            ease: 'none',
          }, 0.32)

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

      const stage = document.querySelector<HTMLElement>('.hero-motion-stage')
      const image = document.querySelector<HTMLElement>('.hero-motion-frame .hero-image')
      const copy = document.querySelector<HTMLElement>('.hero-motion-copy')

      if (!stage || !image || !copy) {
        return () => context.revert()
      }

      const imageX = gsap.quickTo(image, 'x', { duration: 0.8, ease: 'power3.out' })
      const imageY = gsap.quickTo(image, 'y', { duration: 0.8, ease: 'power3.out' })
      const copyX = gsap.quickTo(copy, 'x', { duration: 0.7, ease: 'power3.out' })
      const copyY = gsap.quickTo(copy, 'y', { duration: 0.7, ease: 'power3.out' })

      const onPointerMove = (event: PointerEvent) => {
        const bounds = stage.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5

        imageX(x * 10)
        imageY(y * 7)
        copyX(x * -5)
        copyY(y * -3)
      }

      const onPointerLeave = () => {
        imageX(0)
        imageY(0)
        copyX(0)
        copyY(0)
      }

      stage.addEventListener('pointermove', onPointerMove)
      stage.addEventListener('pointerleave', onPointerLeave)

      return () => {
        stage.removeEventListener('pointermove', onPointerMove)
        stage.removeEventListener('pointerleave', onPointerLeave)
        context.revert()
      }
    })

    return () => media.revert()
  }, [])
}
