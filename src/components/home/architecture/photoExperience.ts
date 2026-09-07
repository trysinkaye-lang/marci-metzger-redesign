import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const range = (progress: number, start: number, end: number) => smooth((progress - start) / (end - start))
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress

export function createPhotoExperience(section: HTMLElement, signal: AbortSignal) {
  const stage = section.querySelector<HTMLElement>('.hero-stage')
  const copy = section.querySelector<HTMLElement>('.hero-copy')
  const caption = section.querySelector<HTMLElement>('.hero-caption')
  const chapter = section.querySelector<HTMLElement>('.architecture-chapter')
  if (!stage || !copy || !caption || !chapter) throw new Error('Hero structure is incomplete')

  const triggerRef: { current?: ScrollTrigger } = {}
  let disposed = false

  const cssVariables = [
    '--intro-copy','--intro-copy-y','--intro-scrim','--intro-progress','--intro-caption-opacity',
    '--backplate-opacity','--backplate-scale','--threshold-opacity','--threshold-scale',
    '--threshold-left-x','--threshold-right-x','--threshold-shadow','--photo-interior-opacity',
    '--photo-interior-scale','--photo-interior-x','--photo-outdoor-opacity','--photo-outdoor-scale',
    '--photo-outdoor-y','--photo-community-opacity','--photo-community-scale','--curtain-y',
    '--curtain-opacity','--handoff-mark-opacity',
  ]

  const dispose = () => {
    if (disposed) return
    disposed = true
    triggerRef.current?.kill()
    copy.inert = false
    caption.inert = false
    cssVariables.forEach((key) => section.style.removeProperty(key))
    delete section.dataset.progress
    delete section.dataset.phase
    delete section.dataset.ready
    delete section.dataset.heroMode
  }

  const update = (rawProgress: number) => {
    const progress = clamp(rawProgress)

    const copyOut = range(progress, .04, .15)
    section.style.setProperty('--intro-copy', (1 - copyOut).toFixed(4))
    section.style.setProperty('--intro-copy-y', `${mix(0, -26, copyOut).toFixed(2)}px`)
    section.style.setProperty('--intro-scrim', (1 - copyOut * .88).toFixed(4))
    copy.inert = copyOut > .98
    caption.inert = copyOut > .98

    const approach = range(progress, .06, .26)
    section.style.setProperty('--backplate-scale', mix(1.06, 1.015, approach).toFixed(4))
    section.style.setProperty('--backplate-opacity', (1 - range(progress, .24, .38) * .55).toFixed(4))

    const thresholdIn = range(progress, .14, .24)
    const thresholdOut = range(progress, .48, .57)
    const thresholdOpacity = thresholdIn * (1 - thresholdOut)
    const split = range(progress, .27, .47)
    section.style.setProperty('--threshold-opacity', thresholdOpacity.toFixed(4))
    section.style.setProperty('--threshold-scale', mix(1.075, 1, thresholdIn).toFixed(4))
    section.style.setProperty('--threshold-left-x', `${mix(0, -104, split).toFixed(2)}%`)
    section.style.setProperty('--threshold-right-x', `${mix(0, 104, split).toFixed(2)}%`)
    section.style.setProperty('--threshold-shadow', mix(0, .42, split).toFixed(3))

    const interiorIn = range(progress, .24, .39)
    const interiorOut = range(progress, .58, .70)
    const interiorOpacity = interiorIn * (1 - interiorOut)
    section.style.setProperty('--photo-interior-opacity', interiorOpacity.toFixed(4))
    section.style.setProperty('--photo-interior-scale', mix(1.12, 1.015, range(progress, .24, .63)).toFixed(4))
    section.style.setProperty('--photo-interior-x', `${mix(2.8, 0, range(progress, .30, .58)).toFixed(2)}%`)

    const outdoorIn = range(progress, .61, .72)
    const outdoorOut = range(progress, .78, .86)
    const outdoorOpacity = outdoorIn * (1 - outdoorOut)
    section.style.setProperty('--photo-outdoor-opacity', outdoorOpacity.toFixed(4))
    section.style.setProperty('--photo-outdoor-scale', mix(1.09, 1.012, range(progress, .62, .82)).toFixed(4))
    section.style.setProperty('--photo-outdoor-y', `${mix(2.5, 0, range(progress, .62, .80)).toFixed(2)}%`)

    const communityIn = range(progress, .80, .88)
    const curtain = range(progress, .91, .985)
    const communityOpacity = communityIn * (1 - curtain)
    section.style.setProperty('--photo-community-opacity', communityOpacity.toFixed(4))
    section.style.setProperty('--photo-community-scale', mix(1.075, 1, range(progress, .80, .95)).toFixed(4))

    section.style.setProperty('--curtain-y', `${mix(100, 0, curtain).toFixed(2)}%`)
    section.style.setProperty('--curtain-opacity', curtain.toFixed(4))
    section.style.setProperty('--handoff-mark-opacity', (range(progress, .94, .972) * (1 - range(progress, .988, 1))).toFixed(4))
    section.style.setProperty('--intro-caption-opacity', (1 - range(progress, .86, .94)).toFixed(4))
    section.style.setProperty('--intro-progress', progress.toFixed(4))

    if (progress < .14) {
      chapter.textContent = 'Pahrump, Nevada'
      section.dataset.phase = 'establish'
    } else if (progress < .30) {
      chapter.textContent = 'Arrive at the property'
      section.dataset.phase = 'approach'
    } else if (progress < .50) {
      chapter.textContent = 'The home opens to you'
      section.dataset.phase = 'reveal'
    } else if (progress < .69) {
      chapter.textContent = 'Step inside'
      section.dataset.phase = 'interior'
    } else if (progress < .84) {
      chapter.textContent = 'Life, indoors and out'
      section.dataset.phase = 'outdoor'
    } else if (progress < .92) {
      chapter.textContent = 'At home in Pahrump'
      section.dataset.phase = 'community'
    } else {
      chapter.textContent = 'Proven results'
      section.dataset.phase = 'handoff'
    }

    section.dataset.progress = progress.toFixed(4)
  }

  section.dataset.heroMode = 'architecture'
  section.dataset.ready = 'true'
  update(0)

  triggerRef.current = ScrollTrigger.create({
    trigger: section,
    start: 'top 96px',
    end: () => `+=${section.offsetHeight - stage.offsetHeight}`,
    onUpdate: (self) => update(self.progress),
    onRefresh: (self) => update(self.progress),
    invalidateOnRefresh: true,
  })

  signal.addEventListener('abort', dispose, { once: true })
  update(triggerRef.current.progress)
  return dispose
}
