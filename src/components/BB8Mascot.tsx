'use client'

import { useRef, useLayoutEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Point Draco decoder at the files we copied to /public/draco/
useGLTF.setDecoderPath('/draco/')

function RobotModel() {
  const group = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/tiny-robot.glb')

  // Clone and boost material brightness
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const original = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial
        const mat = new THREE.MeshStandardMaterial({
          color: original.color?.clone() ?? new THREE.Color(0.7, 0.6, 0.4),
          roughness: Math.min((original.roughness ?? 0.5) * 0.5, 0.45),
          metalness: original.metalness ?? 0.4,
          emissiveIntensity: 0.12,
        })
        // Lift dark surfaces
        const hsl = { h: 0, s: 0, l: 0 }
        mat.color.getHSL(hsl)
        if (hsl.l < 0.3) mat.color.setHSL(hsl.h, hsl.s, 0.4)
        mat.emissive = mat.color.clone().multiplyScalar(0.15)
        mesh.material = mat
      }
    })
    return clone
  }, [scene])

  const origin = useRef({ x: 0, y: 0, z: 0 })

  useLayoutEffect(() => {
    if (!group.current) return
    const box = new THREE.Box3().setFromObject(group.current)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.8 / maxDim
    group.current.scale.setScalar(scale)
    const ox = -center.x * scale
    const oy = -center.y * scale
    const oz = -center.z * scale
    origin.current = { x: ox, y: oy, z: oz }
    group.current.position.set(ox, oy, oz)
  }, [clonedScene])

  const clock = useRef(0)

  useFrame((_, delta) => {
    clock.current += delta
    if (!group.current) return
    const t = clock.current
    group.current.position.y = origin.current.y + Math.sin(t * 1.1) * 0.1
    group.current.rotation.y = Math.sin(t * 0.6) * 0.25
    group.current.rotation.z = Math.sin(t * 0.4) * 0.04
  })

  return (
    <group ref={group}>
      <primitive object={clonedScene} />
    </group>
  )
}

export default function BB8Mascot() {
  return (
    <div style={{ width: '100%', height: 440, maxWidth: 480 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="studio" />
        <ambientLight intensity={3.5} />
        <directionalLight position={[-3, 5, 4]} intensity={5.0} color="#ffffff" />
        <directionalLight position={[4, 2, 4]} intensity={3.5} color="#fff5e8" />
        <pointLight position={[0, -2, 4]} intensity={2.5} color="#c8834a" />

        <RobotModel />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/tiny-robot.glb')
