/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import Index from "./experience/Index";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [indexTexture, setIndexTexture] = useState(0);
  const numberImages = 4;
  const duration = 2.5;

  return (
    <>
      <Header
        numberImages={numberImages}
        indexTexture={indexTexture}
        duration={duration}
      />
      <section className="h-screen">
        <Canvas
          camera={{
            position: [0, 0, 2],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
        >
          <color attach="background" args={["#000"]} />
          <OrthographicCamera
            makeDefault
            top={1}
            right={1}
            bottom={-1}
            left={-1}
            near={0.1}
            far={1000}
            position={[0, 0, 2]}
          />
          <Index
            setIndexTexture={setIndexTexture}
            duration={duration}
            indexTexture={indexTexture}
            numberImages={numberImages}
          />
        </Canvas>
      </section>
    </>
  );
}

export default App;
