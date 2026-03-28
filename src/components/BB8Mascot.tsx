'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import * as THREE from 'three'

function BB8Model() {
  const group = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/bb8.glb')

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.6
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={1} />
    </group>
  )
}

export default function BB8Mascot() {
  return (
    <div style={{ width: '100%', height: 420, maxWidth: 480 }}>
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient base light */}
        <ambientLight intensity={0.35} />

        {/* Key light — warm amber, top-left */}
        <directionalLight
          position={[-3, 4, 3]}
          intensity={1.6}
          color="#c8834a"
        />

        {/* Fill light — cool, right */}
        <directionalLight
          position={[4, 2, -2]}
          intensity={0.5}
          color="#ffffff"
        />

        {/* Rim light — subtle from below */}
        <pointLight position={[0, -3, 2]} intensity={0.4} color="#c8834a" />

        <BB8Model />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/bb8.glb')
