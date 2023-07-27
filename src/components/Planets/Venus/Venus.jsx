import React, { Suspense, useRef } from "react";

import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

import { TextureLoader } from "three";

import styles from "./Venus.module.scss";

const SpherePlanet = () => {
  const SpherePlanetRef = useRef();

  let texture = null;

  if (typeof document !== "undefined") {
    texture = useLoader(TextureLoader, "/Textures/Venus_Surph.jpg");
  }

  useFrame(() => {
    if (SpherePlanetRef.current) {
      SpherePlanetRef.current.rotation.y -= 0.0009;
    }
  });

  return (
    <Sphere visible args={[1, 100, 200]} scale={2} ref={SpherePlanetRef}>
      <MeshDistortMaterial
        color="#ffffff"
        attach="material"
        distort={0}
        speed={1.5}
        roughness={1}
        map={texture}
      />
    </Sphere>
  );
};

const Venus = () => {
  return (
    <div className={styles.Venus}>
      <Canvas className="canvas">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[-2, 5, 2]} />
        <Suspense fallback={null}>
          <SpherePlanet />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Venus;
