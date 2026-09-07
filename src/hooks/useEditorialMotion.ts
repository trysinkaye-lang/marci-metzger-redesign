import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useEditorialMotion() {
  useEffect(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference) and (min-width: 48rem)', () => {
      const context = gsap.context(() => {
        gsap.from('.hero-motion-brand, .hero-motion-location', {
          opacity: 0,
          y: 10,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
        })

        gsap.from('.hero-motion h1 span', {
          opacity: 0,
          y: 42,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
        })

        gsap.from('.hero-motion-experience, .hero-motion-intro-actions', {
          opacity: 0,
          y: 16,
          duration: 0.65,
          stagger: 0.1,
          delay: 0.18,
          ease: 'power2.out',
        })

        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero-motion',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        })

        heroTimeline
          .to(
            '.hero-motion-frame',
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.58,
              ease: 'none',
            },
            0,
          )
          .to(
            '.hero-motion-frame .hero-image',
            {
              scale: 1,
              duration: 0.62,
              ease: 'none',
            },
            0,
          )
          .to(
            '.hero-motion-intro',
            {
              opacity: 0,
              xPercent: -7,
              duration: 0.34,
              ease: 'none',
            },
            0.12,
          )
          .to(
            '.hero-motion-scroll-cue',
            {
              opacity: 0,
              y: 14,
              duration: 0.18,
              ease: 'none',
            },
            0.18,
          )
          .to(
            '.hero-motion-shade',
            {
              opacity: 1,
              duration: 0.22,
              ease: 'none',
            },
            0.42,
          )
          .to(
            '.hero-motion-reveal-inner',
            {
              opacity: 1,
              y: 0,
              duration: 0.26,
              ease: 'power2.out',
            },
            0.51,
          )
          .to(
            '.hero-motion-reveal-actions',
            {
              opacity: 1,
              y: 0,
              duration: 0.24,
              ease: 'power2.out',
            },
            0.58,
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

        const buyerTrigger = {
          trigger: '.buyer-story',
          start: 'top 74%',
          toggleActions: 'play none none reverse',
        }

        gsap.from('.buyer-story-heading', {
          opacity: 0,
          y: 30,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: buyerTrigger,
        })

        gsap.from('.buyer-story-copy', {
          opacity: 0,
          y: 24,
          duration: 0.8,
          delay: 0.08,
          ease: 'power2.out',
          scrollTrigger: buyerTrigger,
        })

        gsap.fromTo(
          '.buyer-story-primary-mask',
          { clipPath: 'inset(0 11% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: '.buyer-story-gallery',
              start: 'top 86%',
              end: 'top 36%',
              scrub: 0.9,
            },
          },
        )

        gsap.from('.buyer-story-detail-mask', {
          opacity: 0,
          y: 64,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.buyer-story-gallery',
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.fromTo(
          '.buyer-story-primary-mask img',
          { scale: 1.055, yPercent: 1.5 },
          {
            scale: 1.01,
            yPercent: -1.5,
            ease: 'none',
            scrollTrigger: {
              trigger: '.buyer-story-gallery',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )

        gsap.fromTo(
          '.buyer-story-detail-mask img',
          { scale: 1.06, yPercent: -1 },
          {
            scale: 1.015,
            yPercent: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: '.buyer-story-gallery',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )

        const servicesStage = document.querySelector<HTMLElement>('.services-cinema-stage')
        const servicesTrack = document.querySelector<HTMLElement>('.services-cinema-track')
        const servicesProgress = document.querySelector<HTMLElement>('.services-cinema-progress-fill')

        if (servicesStage && servicesTrack) {
          gsap.set('.service-scene-2 .service-scene-copy, .service-scene-3 .service-scene-copy', {
            opacity: 0.34,
            x: 34,
          })

          const servicesTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: servicesStage,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })

          servicesTimeline
            .to(
              servicesTrack,
              {
                x: () => -(servicesTrack.scrollWidth - window.innerWidth),
                ease: 'none',
              },
              0,
            )
            .to(
              servicesProgress,
              {
                scaleX: 1,
                ease: 'none',
              },
              0,
            )
            .to(
              '.service-scene-media img',
              {
                scale: 1.012,
                ease: 'none',
              },
              0,
            )
            .to(
              '.service-scene-1 .service-scene-copy',
              {
                opacity: 0.45,
                x: -28,
                ease: 'none',
              },
              0.18,
            )
            .to(
              '.service-scene-2 .service-scene-copy',
              {
                opacity: 1,
                x: 0,
                ease: 'power2.out',
              },
              0.22,
            )
            .to(
              '.service-scene-2 .service-scene-copy',
              {
                opacity: 0.45,
                x: -28,
                ease: 'none',
              },
              0.61,
            )
            .to(
              '.service-scene-3 .service-scene-copy',
              {
                opacity: 1,
                x: 0,
                ease: 'power2.out',
              },
              0.64,
            )
        }
      })

      const stage = document.querySelector<HTMLElement>('.hero-motion-stage')
      const image = document.querySelector<HTMLElement>('.hero-motion-frame .hero-image')
      const intro = document.querySelector<HTMLElement>('.hero-motion-intro-main')

      if (!stage || !image || !intro) {
        return () => context.revert()
      }

      const imageX = gsap.quickTo(image, 'x', { duration: 0.9, ease: 'power3.out' })
      const imageY = gsap.quickTo(image, 'y', { duration: 0.9, ease: 'power3.out' })
      const introX = gsap.quickTo(intro, 'x', { duration: 0.75, ease: 'power3.out' })
      const introY = gsap.quickTo(intro, 'y', { duration: 0.75, ease: 'power3.out' })

      const onPointerMove = (event: PointerEvent) => {
        const bounds = stage.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5

        imageX(x * 7)
        imageY(y * 5)
        introX(x * -3)
        introY(y * -2)
      }

      const onPointerLeave = () => {
        imageX(0)
        imageY(0)
        introX(0)
        introY(0)
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
