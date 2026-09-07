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

const shots: Shot[] = [
  { at: 0, eye: [19, 8, 30], target: [-3, 1, -1], fov: 42 },
  { at: 0.18, eye: [15.5, 6.1, 23], target: [-1.4, 1.15, 0], fov: 42 },
  { at: 0.32, eye: [6.2, 3.4, 15], target: [-0.2, 1.45, 2.3], fov: 44 },
  { at: 0.43, eye: [2.2, 2.35, 10.2], target: [0, 1.55, 2.55], fov: 46 },
  { at: 0.53, eye: [0.85, 2.02, 7.4], target: [0, 1.52, 1.9], fov: 48 },
  { at: 1, eye: [0.85, 2.02, 7.4], target: [0, 1.52, 1.9], fov: 48 },
]

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }
const range = (progress: number, start: number, end: number) => smooth((progress - start) / (end - start))
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress

export async function createExperience(section: HTMLElement, signal: AbortSignal, onFailure: () => void) {
  const host = section.querySelector<HTMLElement>('.architecture-canvas')!
  const stage = section.querySelector<HTMLElement>('.hero-stage')!
  const copy = section.querySelector<HTMLElement>('.hero-copy')!
  const caption = section.querySelector<HTMLElement>('.hero-caption')!
  const chapter = section.querySelector<HTMLElement>('.architecture-chapter')!

  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: true })
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
  let disposed = false, frame = 0, visible = true, progress = 0, webglVisibility = 1
  let environment: ReturnType<PMREMGenerator['fromEquirectangular']> | undefined
  let materialSet: Awaited<ReturnType<typeof loadMaterials>> | undefined
  let trigger: ScrollTrigger | undefined
  let observer: IntersectionObserver | undefined
  let resizeObserver: ResizeObserver | undefined
  let disposeResidence: (() => void) | undefined

  const cssVariables = ['--intro-copy','--intro-copy-y','--intro-scrim','--intro-progress','--intro-caption-opacity','--webgl-opacity','--backplate-opacity','--portal-x','--portal-y','--photo-interior-opacity','--photo-interior-scale','--photo-outdoor-opacity','--photo-outdoor-scale','--photo-community-opacity','--photo-community-scale','--curtain-y','--curtain-opacity','--handoff-mark-opacity']
  const dispose = () => {
    if (disposed) return
    disposed = true
    cancelAnimationFrame(frame); trigger?.kill(); observer?.disconnect(); resizeObserver?.disconnect()
    document.removeEventListener('visibilitychange', visibilityChange)
    renderer.domElement.removeEventListener('webglcontextlost', onFailure)
    scene.traverse((object) => { if (object instanceof Mesh) object.geometry.dispose() })
    materialSet?.dispose(); disposeResidence?.(); environment?.dispose(); pmrem.dispose(); renderer.dispose(); renderer.domElement.remove()
    copy.inert = false; caption.inert = false
    cssVariables.forEach((key) => section.style.removeProperty(key))
    delete section.dataset.progress; delete section.dataset.camera; delete section.dataset.door; delete section.dataset.roof; delete section.dataset.phase; delete section.dataset.ready
  }
  const visibilityChange = () => { if (!document.hidden && webglVisibility > 0.01) invalidate() }
  const render = () => { frame = 0; if (!disposed && visible && !document.hidden && webglVisibility > 0.01) { renderer.render(scene, camera); section.dataset.drawCalls = String(renderer.info.render.calls); section.dataset.triangles = String(renderer.info.render.triangles) } }
  const invalidate = () => { if (!frame && !disposed && visible && !document.hidden && webglVisibility > 0.01) frame = requestAnimationFrame(render) }
  signal.addEventListener('abort', dispose, { once: true })

  try {
    const resources = await Promise.allSettled([loadMaterials(), new HDRLoader().loadAsync('/architecture/goegap-hdri.hdr')])
    const [loadedMaterials, loadedSky] = resources
    if (loadedMaterials.status === 'fulfilled') materialSet = loadedMaterials.value
    if (signal.aborted) { materialSet?.dispose(); if (loadedSky.status === 'fulfilled') loadedSky.value.dispose(); dispose(); throw new DOMException('Aborted', 'AbortError') }
    if (loadedMaterials.status === 'rejected' || loadedSky.status === 'rejected') { if (loadedSky.status === 'fulfilled') loadedSky.value.dispose(); throw new Error('Architectural textures unavailable') }
    loadedSky.value.mapping = EquirectangularReflectionMapping
    environment = pmrem.fromEquirectangular(loadedSky.value); loadedSky.value.dispose(); scene.environment = environment.texture; scene.environmentIntensity = 0.74

    const residence = createResidence(loadedMaterials.value.materials); disposeResidence = residence.dispose; scene.add(residence.root)
    const sun = new DirectionalLight('#fff9f1', 2.65); sun.position.set(-12,18,16); sun.target.position.set(0,0,-2); sun.castShadow = true; sun.shadow.mapSize.set(2048,2048)
    Object.assign(sun.shadow.camera,{left:-25,right:25,top:24,bottom:-24,near:1,far:75}); sun.shadow.normalBias=.035; sun.shadow.bias=-.0001; sun.shadow.radius=3
    scene.add(sun,sun.target,new HemisphereLight('#d9e8ef','#b7aa9b',.5),new AmbientLight('#fffaf3',.46))
    const fill = new DirectionalLight('#fff8ed',.22); fill.position.set(2,4,-8); scene.add(fill)
    host.append(renderer.domElement)

    const eye = new Vector3(), target = new Vector3(), fromEye = new Vector3(), fromTarget = new Vector3()
    const update = (value:number) => {
      progress = clamp(value)
      const index = Math.max(0, shots.findIndex((_, shotIndex) => shotIndex < shots.length - 1 && progress <= shots[shotIndex + 1].at))
      const a=shots[index], b=shots[index+1], t=smooth((progress-a.at)/(b.at-a.at))
      eye.fromArray(b.eye).lerp(fromEye.fromArray(a.eye),1-t); target.fromArray(b.target).lerp(fromTarget.fromArray(a.target),1-t)
      const tablet=stage.clientWidth<1100
      if(tablet){const extra=1.2-.08*range(progress,.2,.42);eye.sub(target).multiplyScalar(extra).add(target)}
      camera.position.copy(eye); camera.lookAt(target); camera.fov=a.fov+(b.fov-a.fov)*t+(tablet?7:0); camera.updateProjectionMatrix()

      const opening=range(progress,.27,.43); residence.door.rotation.y=-opening*Math.PI*.54
      const architecturalReveal=range(progress,.37,.48); residence.roof.position.y=architecturalReveal*(tablet?.6:.82); residence.roof.position.x=-architecturalReveal*.45
      const copyOpacity=1-range(progress,.055,.135)
      section.style.setProperty('--intro-copy',String(copyOpacity)); section.style.setProperty('--intro-copy-y',`${mix(0,-20,1-copyOpacity).toFixed(2)}px`); section.style.setProperty('--intro-scrim',String(copyOpacity)); copy.inert=copyOpacity<.02; caption.inert=copyOpacity<.02

      webglVisibility=1-range(progress,.455,.565); const backplateVisibility=1-range(progress,.425,.555)
      section.style.setProperty('--webgl-opacity',webglVisibility.toFixed(4)); section.style.setProperty('--backplate-opacity',backplateVisibility.toFixed(4))
      const portal=range(progress,.405,.565); section.style.setProperty('--portal-x',`${mix(43,0,portal).toFixed(2)}%`); section.style.setProperty('--portal-y',`${mix(14,0,portal).toFixed(2)}%`)
      const interiorOut=range(progress,.655,.735), interiorOpacity=portal*(1-interiorOut), interiorMove=range(progress,.44,.70)
      section.style.setProperty('--photo-interior-opacity',interiorOpacity.toFixed(4)); section.style.setProperty('--photo-interior-scale',mix(1.095,1.018,interiorMove).toFixed(4))
      const outdoorIn=range(progress,.66,.76), outdoorOut=range(progress,.79,.87), outdoorOpacity=outdoorIn*(1-outdoorOut)
      section.style.setProperty('--photo-outdoor-opacity',outdoorOpacity.toFixed(4)); section.style.setProperty('--photo-outdoor-scale',mix(1.08,1.015,range(progress,.67,.84)).toFixed(4))
      const communityIn=range(progress,.80,.885), curtain=range(progress,.905,.985), communityOpacity=communityIn*(1-curtain)
      section.style.setProperty('--photo-community-opacity',communityOpacity.toFixed(4)); section.style.setProperty('--photo-community-scale',mix(1.07,1,range(progress,.80,.94)).toFixed(4))
      section.style.setProperty('--curtain-y',`${mix(100,0,curtain).toFixed(2)}%`); section.style.setProperty('--curtain-opacity',curtain.toFixed(4))
      const handoffMark=range(progress,.93,.97)*(1-range(progress,.985,1)); section.style.setProperty('--handoff-mark-opacity',handoffMark.toFixed(4)); section.style.setProperty('--intro-caption-opacity',String(1-range(progress,.89,.96))); section.style.setProperty('--intro-progress',String(progress))
      section.dataset.progress=progress.toFixed(4); section.dataset.camera=eye.toArray().map(n=>n.toFixed(4)).join(','); section.dataset.door=residence.door.rotation.y.toFixed(5); section.dataset.roof=residence.roof.position.y.toFixed(5)
      if(progress<.27){chapter.textContent='Pahrump, Nevada';section.dataset.phase='establish'} else if(progress<.44){chapter.textContent='A sense of arrival';section.dataset.phase='entry'} else if(progress<.66){chapter.textContent='Step inside';section.dataset.phase='interior'} else if(progress<.80){chapter.textContent='Life, indoors and out';section.dataset.phase='outdoor'} else if(progress<.91){chapter.textContent='At home in Pahrump';section.dataset.phase='community'} else {chapter.textContent='Proven results';section.dataset.phase='handoff'}
      if(webglVisibility>.01) invalidate()
    }
    const resize=()=>{renderer.setSize(stage.clientWidth,stage.clientHeight);camera.aspect=stage.clientWidth/stage.clientHeight;update(progress)}
    if(scrollY>section.offsetTop+section.offsetHeight) throw new DOMException('Hero already passed','AbortError')
    section.dataset.heroMode='architecture'; resize(); await renderer.compileAsync(scene,camera)
    if(signal.aborted) throw new DOMException('Aborted','AbortError')
    renderer.render(scene,camera); section.dataset.ready='true'
    trigger=ScrollTrigger.create({trigger:section,start:'top 96px',end:()=>`+=${section.offsetHeight-stage.offsetHeight}`,onUpdate:(self)=>update(self.progress),onRefresh:(self)=>update(self.progress),invalidateOnRefresh:true})
    resizeObserver=new ResizeObserver(resize); resizeObserver.observe(stage)
    observer=new IntersectionObserver((entries)=>{visible=entries[0].isIntersecting;if(visible&&webglVisibility>.01)invalidate();else{cancelAnimationFrame(frame);frame=0}},{rootMargin:'80px'}); observer.observe(section)
    document.addEventListener('visibilitychange',visibilityChange); update(trigger.progress); return dispose
  } catch(error){dispose();throw error}
}
