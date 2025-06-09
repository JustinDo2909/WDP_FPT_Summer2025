"use client";
import {
  Environment,
  Float,
  OrbitControls,
  Text
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Thêm Error Boundary cho component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
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

function ProductBottle(props) {
  const meshRef = useRef(null);
  const [hovered, setHover] = useState(false);

  // Giảm độ phức tạp của hình dạng
  const shape = new THREE.Shape()
    .moveTo(0, -1)
    .lineTo(0.3, -1)
    .lineTo(0.4, -0.5)
    .lineTo(0.5, 0.5)
    .lineTo(0.3, 1)
    .lineTo(-0.3, 1)
    .lineTo(-0.5, 0.5)
    .lineTo(-0.4, -0.5)
    .lineTo(-0.3, -1)
    .lineTo(0, -1);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1; // Giảm tốc độ xoay
    }
  });

  return (
    <group {...props}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]} // Giảm scale khi hover
      >
        <extrudeGeometry
          args={[
            shape,
            {
              steps: 1,
              depth: 0.3,
              bevelEnabled: true,
              bevelThickness: 0.03, // Giảm bevel
              bevelSize: 0.03,
              bevelSegments: 5, // Giảm số segment
            },
          ]}
        />
        <meshPhysicalMaterial
          color={props.color || "#ffc0cb"}
          transmission={0.6} // Giảm độ trong suốt
          roughness={0.2}
          thickness={0.2}
          clearcoat={0.8}
        />
      </mesh>
      {hovered && (
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.15} // Giảm kích thước text
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {props.name || "Sản phẩm mới"}
        </Text>
      )}
    </group>
  );
}

function Lipstick(props) {
  const meshRef = useRef(null);

  // Đơn giản hóa hình dạng son
  const shape = new THREE.Shape()
    .moveTo(0, -1)
    .lineTo(0.15, -1)
    .lineTo(0.15, 0.8)
    .lineTo(0.1, 1)
    .lineTo(-0.1, 1)
    .lineTo(-0.15, 0.8)
    .lineTo(-0.15, -1)
    .lineTo(0, -1);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Giảm tốc độ
    }
  });

  return (
    <group {...props}>
      <mesh ref={meshRef}>
        <extrudeGeometry
          args={[
            shape,
            {
              steps: 1,
              depth: 0.15, // Giảm độ sâu
              bevelEnabled: false, // Tắt bevel
            },
          ]}
        />
        <meshStandardMaterial // Thay Physical bằng Standard
          color={props.color || "#d63031"}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.6, 16]} /> {/* Giảm segments */}
        <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
      </mesh>
    </group>
  );
}

function BannerText() {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
      {" "}
      {/* Giảm hiệu ứng */}
      <Text
        position={[0, 1.2, 0]} // Điều chỉnh vị trí
        fontSize={0.5} // Giảm kích thước
        maxWidth={2} // Giới hạn chiều rộng
        lineHeight={1}
        letterSpacing={0.02}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtY.ttf"
      >
        Glow Beauty
      </Text>
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color="#f8a5c2"
        anchorX="center"
        anchorY="middle"
      >
        Bộ sưu tập mùa hè 2024
      </Text>
    </Float>
  );
}

function Sparkles() {
  const particles = useRef();
  const count = 500; // Giảm đáng kể số lượng particles

  useFrame((state) => {
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
              Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 10) // Giảm phạm vi
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
      <div className="h-[600px] w-full bg-gradient-to-b from-gray-900 to-purple-900 relative">
        <Canvas
          ref={canvasRef}
          gl={{
            powerPreference: "high-performance",
            antialias: false,
            preserveDrawingBuffer: true,
          }}
          camera={{ position: [0, 0, 8], fov: 45 }}
          frameloop="demand" // Tiết kiệm tài nguyên
          dpr={[1, 2]} // Giảm độ phân giải trên thiết bị yếu
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <spotLight
              position={[5, 5, 5]} // Điều chỉnh vị trí gần hơn
              angle={0.2}
              intensity={1}
              penumbra={0.5}
            />
            <Environment preset="dawn" /> {/* Sử dụng preset nhẹ hơn */}
            <Sparkles />
            <Float speed={1} rotationIntensity={0.3}>
              <ProductBottle
                position={[-1.5, -0.5, 0]}
                color="#ffc0cb"
                name="Nước hoa hồng"
              />
            </Float>
            <Float speed={1.5} rotationIntensity={0.2}>
              <Lipstick position={[1.5, -0.5, 0]} color="#e84393" />
            </Float>
            <BannerText />
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
