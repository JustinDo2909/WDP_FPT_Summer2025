"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";

// Thêm Error Boundary cho component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error()("error ", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ThreeJS Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-white p-4">Banner tạm thời không khả dụng</div>
      );
    }
    return this.props.children;
  }
}

function Sparkles() {
  const particles = useRef();
  const count = 1000; // Giảm đáng kể số lượng particles

  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.y += 0.005; // Giảm tốc độ
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={
            new Float32Array(
              Array.from(
                { length: count * 3 },
                () => (Math.random() - 0.5) * 10,
              ), // Giảm phạm vi
            )
          }
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05} // Giảm kích thước
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.6} // Giảm độ mờ
      />
    </points>
  );
}

export default function CosmeticBanner() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.dispatchEvent(new Event("webglcontextrestored"));
        }
      }, 1000);
    };

    const canvas = canvasRef.current;
    canvas?.addEventListener("webglcontextlost", handleContextLost, false);

    return () => {
      canvas?.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="h-screen w-full bg-gradient-to-b from-gray-900 to-purple-900 relative">
        <Canvas
          ref={canvasRef}
          gl={{
            powerPreference: "high-performance",
            antialias: false,
            preserveDrawingBuffer: true,
          }}
          camera={{ position: [0, 0, 8], fov: 45 }}
          frameloop="demand" // Tiết kiệm tài nguyên
          dpr={[1, 5]} // Giảm độ phân giải trên thiết bị yếu
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <spotLight
              position={[5, 5, 5]} // Điều chỉnh vị trí gần hơn
              angle={0.2}
              intensity={1}
              penumbra={0.5}
            />
            <Environment preset="night" /> {/* Sử dụng preset nhẹ hơn */}
            <Sparkles />
            {/* <BannerText /> */}
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.3} // Giảm tốc độ
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.8}
              enablePan={false}
            />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
