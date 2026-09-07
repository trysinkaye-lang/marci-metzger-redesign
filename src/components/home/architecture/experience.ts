import {
  ACESFilmicToneMapping,
  AmbientLight,
  DirectionalLight,
  EquirectangularReflectionMapping,
  HemisphereLight,
  Mesh,
  PCFShadowMap,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three'
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loadMaterials } from './materials'
import { createResidence } from './residence'

gsap.registerPlugin(ScrollTrigger)

type Shot = { at: number; eye: [number, number, number]; target: [number, number, number]; fov: number }

// The WebGL camera deliberately stops at the threshold. The real photography takes
// over before the modeled interior can become the visual focus.
const shots: Shot[] = [
  { at: 0, eye: [20, 7.5, 31], target: [-3, 1, -1], fov: 40 },
  { at: 0.16, eye: [15.8, 5.8, 24.5], target: [-1.5, 1.2, 0], fov: 40 },
  { at: 0.30, eye: [7.5, 3.7, 16.3], target: [-0.3, 1.45, 2.1], fov: 42 },
  { at: 0.41, eye: [3.1, 2.7, 11.6], target: [0, 1.55, 2.45], fov: 44 },
  { at: 0.50, eye: [1.35, 2.18, 8.25], target: [0, 1.52, 2.0], fov: 45 },
  { at: 1, eye: [1.35, 2.18, 8.25], target: [0, 1.52, 2.0], fov: 45 },
]

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const range = (progress: number, start: number, end: number) => smooth((progress - start) / (end - start))
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress

/** One scroll progress value drives WebGL, photography and the HTML handoff. */
export async function createExperience(section: HTMLElement, signal: AbortSignal, onFailure: () => void) {
  const host = section.querySelector<HTMLElement>('.architecture-canvas')!
  const stage = section.querySelector<HTMLElement>('.hero-stage')!
  const copy = section.querySelector<HTMLElement>('.hero-copy')!
  const caption = section.querySelector<HTMLElement>('.hero-caption')!
  const chapter = section.querySelector<HTMLElement>('.architecture-chapter')!

  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: true,
  })
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.04
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFShadowMap
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
  renderer.domElement.setAttribute('aria-hidden', 'true')
  renderer.domElement.addEventListener('webglcontextlost', onFailure, { once: true })

  const scene = new Scene()
  const camera = new PerspectiveCamera(42, 1, 0.065, 280)
  const pmrem = new PMREMGenerator(renderer)

  let disposed = false
  let frame = 0
  let visible = true
  let progress = 0
  let webglVisibility = 1
  let environment: ReturnType<PMREMGenerator['fromEquirectangular']> | undefined
  let materialSet: Awaited<ReturnType<typeof loadMaterials>> | undefined
  let trigger: ScrollTrigger | undefined
  let observer: IntersectionObserver | undefined
  let resizeObserver: ResizeObserver | undefined
  let disposeResidence: (() => void) | undefined

  const cssVariables = [
    '--intro-copy',
    '--intro-copy-y',
    '--intro-scrim',
    '--intro-progress',
    '--intro-caption-opacity',
    '--webgl-opacity',
    '--backplate-opacity',
    '--portal-x',
    '--portal-y',
    '--photo-interior-opacity',
    '--photo-interior-scale',
    '--photo-outdoor-opacity',
    '--photo-outdoor-scale',
    '--photo-community-opacity',
    '--photo-community-scale',
    '--curtain-y',
    '--curtain-opacity',
    '--handoff-mark-opacity',
  ]

  const dispose = () => {
    if (disposed) return
    disposed = true
    cancelAnimationFrame(frame)
    trigger?.kill()
    observer?.disconnect()
    resizeObserver?.disconnect()
    document.removeEventListener('visibilitychange', visibilityChange)
    renderer.domElement.removeEventListener('webglcontextlost', onFailure)
    scene.traverse((object) => {
      if (object instanceof Mesh) object.geometry.dispose()
    })
    materialSet?.dispose()
    disposeResidence?.()
    environment?.dispose()
    pmrem.dispose()
    renderer.dispose()
    renderer.domElement.remove()
    copy.inert = false
    caption.inert = false
    cssVariables.forEach((key) => section.style.removeProperty(key))
    delete section.dataset.progress
    delete section.dataset.camera
    delete section.dataset.door
    delete section.dataset.roof
    delete section.dataset.phase
    delete section.dataset.ready
  }

  const visibilityChange = () => {
    if (!document.hidden && webglVisibility > 0.01) invalidate()
  }
  const render = () => {
    frame = 0
    if (!disposed && visible && !document.hidden && webglVisibility > 0.01) {
      renderer.render(scene, camera)
      section.dataset.drawCalls = String(renderer.info.render.calls)
      section.dataset.triangles = String(renderer.info.render.triangles)
    }
  }
  const invalidate = () => {
    if (!frame && !disposed && visible && !document.hidden && webglVisibility > 0.01) {
      frame = requestAnimationFrame(render)
    }
  }

  signal.addEventListener('abort', dispose, { once: true })

  try {
    const resources = await Promise.allSettled([
      loadMaterials(),
      new HDRLoader().loadAsync('/architecture/goegap-hdri.hdr'),
    ])
    const [loadedMaterials, loadedSky] = resources

    if (loadedMaterials.status === 'fulfilled') materialSet = loadedMaterials.value
    if (signal.aborted) {
      materialSet?.dispose()
      if (loadedSky.status === 'fulfilled') loadedSky.value.dispose()
      dispose()
      throw new DOMException('Aborted', 'AbortError')
    }
    if (loadedMaterials.status === 'rejected' || loadedSky.status === 'rejected') {
      if (loadedSky.status === 'fulfilled') loadedSky.value.dispose()
      throw new Error('Architectural textures unavailable')
    }

    loadedSky.value.mapping = EquirectangularReflectionMapping
    environment = pmrem.fromEquirectangular(loadedSky.value)
    loadedSky.value.dispose()
    scene.environment = environment.texture
    scene.environmentIntensity = 0.74

    const residence = createResidence(loadedMaterials.value.materials)
    disposeResidence = residence.dispose
    scene.add(residence.root)

    const sun = new DirectionalLight('#fff9f1', 2.65)
    sun.position.set(-12, 18, 16)
    sun.target.position.set(0, 0, -2)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    Object.assign(sun.shadow.camera, { left: -25, right: 25, top: 24, bottom: -24, near: 1, far: 75 })
    sun.shadow.normalBias = 0.035
    sun.shadow.bias = -0.0001
    sun.shadow.radius = 3
    scene.add(sun, sun.target, new HemisphereLight('#d9e8ef', '#b7aa9b', 0.5), new AmbientLight('#fffaf3', 0.46))
    const fill = new DirectionalLight('#fff8ed', 0.22)
    fill.position.set(2, 4, -8)
    scene.add(fill)

    host.append(renderer.domElement)

    const eye = new Vector3()
    const target = new Vector3()
    const fromEye = new Vector3()
    const fromTarget = new Vector3()

    const update = (value: number) => {
      progress = clamp(value)
      const index = Math.max(0, shots.findIndex((_, shotIndex) => shotIndex < shots.length - 1 && progress <= shots[shotIndex + 1].at))
      const a = shots[index]
      const b = shots[index + 1]
      const t = smooth((progress - a.at) / (b.at - a.at))

      eye.fromArray(b.eye).lerp(fromEye.fromArray(a.eye), 1 - t)
      target.fromArray(b.target).lerp(fromTarget.fromArray(a.target), 1 - t)

      const tablet = stage.clientWidth < 1100
      if (tablet) {
        // Keep the residence fully legible and avoid a claustrophobic doorway shot.
        const extra = 1.2 - 0.08 * range(progress, 0.2, 0.42)
        eye.sub(target).multiplyScalar(extra).add(target)
      }

      camera.position.copy(eye)
      camera.lookAt(target)
      camera.fov = a.fov + (b.fov - a.fov) * t + (tablet ? 7 : 0)
      camera.updateProjectionMatrix()

      // The only literal 3D flourish: a believable entry opening and a restrained
      // roof reveal. Both finish before photography becomes dominant.
      const opening = range(progress, 0.22, 0.40)
      residence.door.rotation.y = -opening * Math.PI * 0.51
      const architecturalReveal = range(progress, 0.33, 0.46)
      residence.roof.position.y = architecturalReveal * (tablet ? 0.34 : 0.46)
      residence.roof.position.x = -architecturalReveal * 0.18

      // Hero copy clears early so the entrance becomes the focal point.
      const copyOpacity = 1 - range(progress, 0.055, 0.135)
      section.style.setProperty('--intro-copy', String(copyOpacity))
      section.style.setProperty('--intro-copy-y', `${mix(0, -20, 1 - copyOpacity).toFixed(2)}px`)
      section.style.setProperty('--intro-scrim', String(copyOpacity))
      copy.inert = copyOpacity < 0.02
      caption.inert = copyOpacity < 0.02

      // The modeled world never becomes a close-up interior. It dissolves at the
      // threshold while a real source photograph opens inside the doorway.
      webglVisibility = 1 - range(progress, 0.43, 0.52)
      const backplateVisibility = 1 - range(progress, 0.39, 0.50)
      section.style.setProperty('--webgl-opacity', webglVisibility.toFixed(4))
      section.style.setProperty('--backplate-opacity', backplateVisibility.toFixed(4))

      const portal = range(progress, 0.36, 0.54)
      section.style.setProperty('--portal-x', `${mix(44, 0, portal).toFixed(2)}%`)
      section.style.setProperty('--portal-y', `${mix(18, 0, portal).toFixed(2)}%`)

      const interiorOut = range(progress, 0.67, 0.76)
      const interiorOpacity = portal * (1 - interiorOut)
      const interiorMove = range(progress, 0.41, 0.72)
      section.style.setProperty('--photo-interior-opacity', interiorOpacity.toFixed(4))
      section.style.setProperty('--photo-interior-scale', mix(1.105, 1.015, interiorMove).toFixed(4))

      const outdoorIn = range(progress, 0.68, 0.78)
      const outdoorOut = range(progress, 0.80, 0.875)
      const outdoorOpacity = outdoorIn * (1 - outdoorOut)
      section.style.setProperty('--photo-outdoor-opacity', outdoorOpacity.toFixed(4))
      section.style.setProperty('--photo-outdoor-scale', mix(1.075, 1.012, range(progress, 0.69, 0.85)).toFixed(4))

      const communityIn = range(progress, 0.82, 0.90)
      const curtain = range(progress, 0.92, 0.985)
      const communityOpacity = communityIn * (1 - curtain)
      section.style.setProperty('--photo-community-opacity', communityOpacity.toFixed(4))
      section.style.setProperty('--photo-community-scale', mix(1.06, 1.0, range(progress, 0.82, 0.95)).toFixed(4))

      // An ivory curtain matches the following section's background, so the sticky
      // stage can release without a visible cut between "experience" and website.
      section.style.setProperty('--curtain-y', `${mix(100, 0, curtain).toFixed(2)}%`)
      section.style.setProperty('--curtain-opacity', curtain.toFixed(4))
      const handoffMark = range(progress, 0.93, 0.97) * (1 - range(progress, 0.985, 1))
      section.style.setProperty('--handoff-mark-opacity', handoffMark.toFixed(4))
      section.style.setProperty('--intro-caption-opacity', String(1 - range(progress, 0.89, 0.96)))
      section.style.setProperty('--intro-progress', String(progress))

      section.dataset.progress = progress.toFixed(4)
      section.dataset.camera = eye.toArray().map((number) => number.toFixed(4)).join(',')
      section.dataset.door = residence.door.rotation.y.toFixed(5)
      section.dataset.roof = residence.roof.position.y.toFixed(5)

      if (progress < 0.22) {
        chapter.textContent = 'Pahrump, Nevada'
        section.dataset.phase = 'establish'
      } else if (progress < 0.43) {
        chapter.textContent = 'A sense of arrival'
        section.dataset.phase = 'entry'
      } else if (progress < 0.68) {
        chapter.textContent = 'Step inside'
        section.dataset.phase = 'interior'
      } else if (progress < 0.82) {
        chapter.textContent = 'Life, indoors and out'
        section.dataset.phase = 'outdoor'
      } else if (progress < 0.92) {
        chapter.textContent = 'At home in Pahrump'
        section.dataset.phase = 'community'
      } else {
        chapter.textContent = 'Proven results'
        section.dataset.phase = 'handoff'
      }

      if (webglVisibility > 0.01) invalidate()
    }

    const resize = () => {
      renderer.setSize(stage.clientWidth, stage.clientHeight)
      camera.aspect = stage.clientWidth / stage.clientHeight
      update(progress)
    }

    // A slow asset download must not pull a visitor backwards after they have moved on.
    if (scrollY > section.offsetTop + section.offsetHeight) throw new DOMException('Hero already passed', 'AbortError')

    section.dataset.heroMode = 'architecture'
    resize()

    // Compile and paint before yielding the static hero to WebGL.
    await renderer.compileAsync(scene, camera)
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError')
    renderer.render(scene, camera)
    section.dataset.ready = 'true'

    trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 96px',
      end: () => `+=${section.offsetHeight - stage.offsetHeight}`,
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => update(self.progress),
      invalidateOnRefresh: true,
    })

    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(stage)
    observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
      if (visible && webglVisibility > 0.01) invalidate()
      else {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }, { rootMargin: '80px' })
    observer.observe(section)
    document.addEventListener('visibilitychange', visibilityChange)

    update(trigger.progress)
    return dispose
  } catch (error) {
    dispose()
    throw error
  }
}
