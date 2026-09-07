import { useEffect, useRef } from 'react'

export function useArchitecturalIntro() {
  const heroRef=useRef<HTMLElement>(null)
  useEffect(()=>{
    const section=heroRef.current!
    const motion=matchMedia('(prefers-reduced-motion: reduce)')
    const desktop=matchMedia('(min-width: 768px)')
    const device=navigator as Navigator & {deviceMemory?:number;connection?:{saveData?:boolean}}
    let abort:AbortController|undefined, dispose:(()=>void)|undefined, timer:number|undefined
    const stop=()=>{window.clearTimeout(timer);abort?.abort();dispose?.();dispose=undefined;section.dataset.heroMode='static';delete section.dataset.ready}
    const start=()=>{
      stop()
      if(motion.matches||!desktop.matches||device.connection?.saveData||(device.deviceMemory!==undefined&&device.deviceMemory<4)||navigator.hardwareConcurrency<4)return
      const controller=new AbortController();abort=controller
      timer=window.setTimeout(()=>{if(!controller.signal.aborted)stop()},18000)
      import('../components/home/architecture/experience').then(module=>{
        if(controller.signal.aborted)return
        return module.createExperience(section,controller.signal,stop)
      }).then(cleanup=>{if(controller.signal.aborted)cleanup?.();else{dispose=cleanup;window.clearTimeout(timer)}}).catch(()=>{if(!controller.signal.aborted)stop()})
    }
    start();motion.addEventListener('change',start);desktop.addEventListener('change',start)
    return()=>{stop();motion.removeEventListener('change',start);desktop.removeEventListener('change',start)}
  },[])
  return heroRef
}
