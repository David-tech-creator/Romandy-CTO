'use client'

import { useRef, useLayoutEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function BB8Model() {
  const group = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/bb8.glb')
  const texture = useTexture('/bb8-texture.jpg')

  // Apply texture to all meshes and fix material
  const patchedScene = useMemo(() => {
    texture.flipY = false
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const mat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.45,
          metalness: 0.25,
        })
        mesh.material = mat
      }
    })
    return clone
  }, [scene, texture])

  // Auto-scale and center
  useLayoutEffect(() => {
    if (!group.current) return
    const box = new THREE.Box3().setFromObject(group.current)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.8 / maxDim
    group.current.scale.setScalar(scale)
    group.current.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale,
    )
  }, [patchedScene])

  // Rotate + float + wobble
  const clock = useRef(0)
  useFrame((_, delta) => {
    clock.current += delta
    if (group.current) {
      group.current.rotation.y += delta * 0.55
      // Gentle float up/down
      group.current.position.y = -0.15 + Math.sin(clock.current * 1.2) * 0.12
      // Slight side tilt
      group.current.rotation.z = Math.sin(clock.current * 0.8) * 0.06
    }
  })

  return (
    <group ref={group}>
      <primitive object={patchedScene} />
    </group>
  )
}

export default function BB8Mascot() {
  return (
    <div style={{ width: '100%', height: 440, maxWidth: 480 }}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient base */}
        <ambientLight intensity={0.55} />
        {/* Key light — warm white, top-left */}
        <directionalLight position={[-4, 6, 3]} intensity={2.0} color="#fff5e8" />
        {/* Fill — neutral, right */}
        <directionalLight position={[5, 2, -2]} intensity={0.7} color="#ffffff" />
        {/* Amber rim from below */}
        <pointLight position={[0, -4, 2]} intensity={0.6} color="#c8834a" />

        <BB8Model />

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

useGLTF.preload('/bb8.glb')
