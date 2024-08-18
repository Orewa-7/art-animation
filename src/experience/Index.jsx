/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Index = ({ setIndexTexture, duration, indexTexture, numberImages }) => {
  const texture1 = useTexture("/preaching-of-john-the-baptist.webp");
  texture1.wrapS = THREE.MirroredRepeatWrapping;
  texture1.wrapT = THREE.MirroredRepeatWrapping;

  const texture2 = useTexture("view-haarlem-haarlemmer.webp");
  texture2.wrapS = THREE.MirroredRepeatWrapping;
  texture2.wrapT = THREE.MirroredRepeatWrapping;

  const texture3 = useTexture("vinland.webp");
  texture2.wrapS = THREE.MirroredRepeatWrapping;
  texture2.wrapT = THREE.MirroredRepeatWrapping;

  const texture4 = useTexture("akira.webp");
  texture2.wrapS = THREE.MirroredRepeatWrapping;
  texture2.wrapT = THREE.MirroredRepeatWrapping;

  const textures = [texture1, texture2, texture3, texture4];

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uProgress: { value: 0 },
          uTexture1: { value: textures[indexTexture] },
          uTexture2: { value: textures[(indexTexture + 1) % numberImages] },
        },
      }),
    [indexTexture]
  );

  useGSAP(() => {
    gsap.to(material.uniforms.uProgress, {
      value: 1,
      duration: duration,
      ease: "power2.out",
      onComplete: () => {
        setIndexTexture((indexTexture + 1) % numberImages);
      },
    });
  }, [indexTexture]);
  const size = 2;
  return (
    <>
      <mesh position={[0, 0, 0]} material={material}>
        <planeGeometry args={[size, size]} />
      </mesh>
    </>
  );
};

export default Index;
