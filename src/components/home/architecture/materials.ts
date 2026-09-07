import { Color, MeshPhysicalMaterial, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, TextureLoader, Vector2 } from 'three'

export async function loadMaterials() {
  const loader = new TextureLoader()
  const textures = await Promise.all([
    'beige_wall_001-Diffuse.jpg', 'beige_wall_001-nor_gl.jpg',
    'clay_roof_tiles-Diffuse.jpg', 'clay_roof_tiles-nor_gl.jpg',
    'wood_table_001-Diffuse.jpg', 'wood_table_001-nor_gl.jpg',
    'stone_wall_02-Diffuse.jpg', 'stone_wall_02-nor_gl.jpg',
    'sandy_gravel-Diffuse.jpg', 'sandy_gravel-nor_gl.jpg',
  ].map((file, index) => loader.loadAsync(`/architecture/${file}`).then(texture => {
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.anisotropy = 4
    if (index % 2 === 0) texture.colorSpace = SRGBColorSpace
    return texture
  })))
  const [plaster, plasterNormal, roof, roofNormal, timber, timberNormal, stone, stoneNormal, gravel, gravelNormal] = textures
  const materials = {
    stucco: new MeshStandardMaterial({ color: '#c6bba8', normalMap: plasterNormal, normalScale: new Vector2(.48,.48), roughness: .94 }),
    interior: new MeshStandardMaterial({ color: '#eae5dc', normalMap: plasterNormal, normalScale: new Vector2(.13,.13), roughness: .93 }),
    stone: new MeshStandardMaterial({ color: '#d2be9e', map: stone, normalMap: stoneNormal, normalScale: new Vector2(.7,.7), roughness: .96 }),
    roof: new MeshStandardMaterial({ color: '#e3d0b5', map: roof, normalMap: roofNormal, normalScale: new Vector2(.85,.85), roughness: .94 }),
    timber: new MeshStandardMaterial({ color: '#ffe2b6', map: timber, normalMap: timberNormal, normalScale: new Vector2(.3,.3), roughness: .65 }),
    bronze: new MeshStandardMaterial({ color: '#342f29', metalness: .48, roughness: .46 }),
    glass: new MeshPhysicalMaterial({ color: '#8f9b93', roughness: .08, metalness: .35, transparent: true, opacity: .4, envMapIntensity: .9, depthWrite: false }),
    floor: new MeshStandardMaterial({ color: '#c6beb2', normalMap: plasterNormal, normalScale: new Vector2(.05,.05), roughness: .8 }),
    grout: new MeshStandardMaterial({ color: '#a59c8f', roughness: .98 }),
    trim: new MeshStandardMaterial({ color: '#d7cec0', roughness: .82 }),
    gravel: new MeshStandardMaterial({ color: '#c1b29b', map: gravel, normalMap: gravelNormal, normalScale: new Vector2(.6,.6), roughness: 1 }),
    concrete: new MeshStandardMaterial({ color: '#a7a296', map: plaster, normalMap: plasterNormal, normalScale: new Vector2(.28,.28), roughness: .92 }),
    fabric: new MeshStandardMaterial({ color: '#b0a28b', roughness: 1 }),
    linen: new MeshStandardMaterial({ color: '#eee7da', roughness: 1 }),
    leather: new MeshStandardMaterial({ color: '#744735', roughness: .72 }),
    leaves: new MeshStandardMaterial({ color: '#697259', roughness: .95, side: 2 }),
    water: new MeshPhysicalMaterial({ color: new Color('#3c6864'), roughness: .26, metalness: .1, transparent: true, opacity: .88, envMapIntensity: .5 }),
    pool: new MeshStandardMaterial({ color: '#adbdb4', roughness: .67 }),
  }
  for(const material of [materials.stucco,materials.floor,materials.linen]){
    material.onBeforeCompile=shader=>{
      shader.vertexShader='varying vec3 roomPosition;\n'+shader.vertexShader
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nroomPosition=(modelMatrix*vec4(position,1.0)).xyz;')
      shader.fragmentShader='varying vec3 roomPosition;\n'+shader.fragmentShader
      shader.fragmentShader=shader.fragmentShader.replace('#include <aomap_fragment>',`#include <aomap_fragment>
        if(roomPosition.x > -3.9 && roomPosition.x < 7.9 && roomPosition.z > -4.9 && roomPosition.z < 2.9){
          float edge = min(min(abs(roomPosition.x+3.87),abs(roomPosition.x-7.87)),min(abs(roomPosition.z+4.87),abs(roomPosition.z-2.87)));
          float vertical = min(abs(roomPosition.y-.2),abs(roomPosition.y-3.0));
          float occlusion = 1.0 - .38 * exp(-edge*3.0) - .15 * exp(-vertical*4.0);
          reflectedLight.indirectDiffuse *= clamp(occlusion,.45,1.0);
        }`)
    }
  }
  materials.roof.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>\n diffuseColor.rgb = mix(vec3(dot(diffuseColor.rgb, vec3(.2126,.7152,.0722))),diffuseColor.rgb,.13);`)}
  materials.gravel.transparent=true
  materials.gravel.onBeforeCompile=shader=>{
    shader.vertexShader='varying vec3 sitePosition;\n'+shader.vertexShader
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nsitePosition = (modelMatrix * vec4(position,1.0)).xyz;')
    shader.fragmentShader='varying vec3 sitePosition;\n'+shader.fragmentShader
    shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>','if(sitePosition.x > -2.94 && sitePosition.x < 5.94 && sitePosition.z > -14.16 && sitePosition.z < -9.84) discard;\ndiffuseColor.a *= 1.0-smoothstep(21.0,36.0,length(sitePosition.xz*vec2(1.0,.8)));\n#include <opaque_fragment>')
  }
  return { materials, dispose: () => { Object.values(materials).forEach(m => m.dispose()); textures.forEach(t => t.dispose()) } }
}
export type HouseMaterials = Awaited<ReturnType<typeof loadMaterials>>['materials']
