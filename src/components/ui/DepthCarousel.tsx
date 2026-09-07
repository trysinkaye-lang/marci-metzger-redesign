import { useCallback, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import type { GalleryImage } from '../../data/gallery'

interface DepthCarouselProps {
  items: readonly GalleryImage[]
}

const wrapIndex = (index: number, length: number) => (index + length) % length

function relativeIndex(index: number, activeIndex: number, length: number) {
  let difference = index - activeIndex
  if (difference > length / 2) difference -= length
  if (difference < -length / 2) difference += length
  return difference
}

export function DepthCarousel({ items }: DepthCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const pointerStart = useRef<number | null>(null)

  const goTo = useCallback((index: number) => {
    setActiveIndex(wrapIndex(index, items.length))
  }, [items.length])

  const goPrevious = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrevious()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
    if (event.key === 'Home') {
      event.preventDefault()
      goTo(0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      goTo(items.length - 1)
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return
    const distance = event.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(distance) < 42) return
    if (distance > 0) goPrevious()
    else goNext()
  }

  const activeItem = items[activeIndex]

  return (
    <div className="depth-carousel-shell">
      <div
        className="depth-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Pahrump property photo gallery"
        aria-describedby="gallery-instructions"
        tabIndex={0}
        onKeyDown={handleKeyboard}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div className="depth-carousel-stage">
          <button
            type="button"
            className="depth-carousel-side-arrow depth-carousel-side-arrow-previous"
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              goPrevious()
            }}
            aria-label="Previous image"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className="depth-carousel-rail" aria-live="off">
            {items.map((item, index) => {
              const offset = relativeIndex(index, activeIndex, items.length)
              const distance = Math.abs(offset)
              const visible = distance <= 2
              const x = offset === 0 ? 0 : Math.sign(offset) * (distance === 1 ? 48 : 76)
              const z = distance === 0 ? 0 : distance === 1 ? -130 : -240
              const rotation = offset === 0 ? 0 : -Math.sign(offset) * (distance === 1 ? 10 : 14)
              const scale = distance === 0 ? 1 : distance === 1 ? 0.86 : 0.72
              const opacity = distance === 0 ? 1 : distance === 1 ? 0.58 : 0.2

              return (
                <button
                  key={item.id}
                  className="depth-carousel-card"
                  type="button"
                  aria-label={`Show ${item.title}`}
                  aria-hidden={!visible}
                  tabIndex={offset === 0 ? 0 : -1}
                  onClick={() => goTo(index)}
                  style={{
                    transform: `translate3d(calc(-50% + ${x}%), -50%, ${z}px) rotateY(${rotation}deg) scale(${scale})`,
                    opacity: visible ? opacity : 0,
                    zIndex: 10 - distance,
                    pointerEvents: visible ? 'auto' : 'none',
                  }}
                >
                  <img
                    src={item.src}
                    alt={offset === 0 ? item.alt : ''}
                    width={item.width}
                    height={item.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </button>
              )
            })}
          </div>

          <button
            type="button"
            className="depth-carousel-side-arrow depth-carousel-side-arrow-next"
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
            aria-label="Next image"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="depth-carousel-meta" aria-live="polite">
        <div className="depth-carousel-count" aria-label={`Image ${activeIndex + 1} of ${items.length}`}>
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="depth-carousel-count-line" aria-hidden="true" />
          <span>{String(items.length).padStart(2, '0')}</span>
        </div>
        <div className="depth-carousel-copy">
          <p className="eyebrow">Photo Gallery</p>
          <h3>{activeItem.title}</h3>
          <p>{activeItem.description}</p>
        </div>
      </div>
    </div>
  )
}
