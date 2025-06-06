"use client";

import { Area, Box, Container } from "@/lib/by/Div";
import React from "react";

export default function Loader() {
  return (
    <Container className="flex items-center justify-center min-h-screen bg-gray-100">
      <Area className="flex space-x-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Box
            key={i}
            className={`w-3 h-32 bg-pink-500 rounded-md animate-wave`}
            style={{ animationDelay: `${i * 0.1}s` }}
          ></Box>
        ))}
      </Area>
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: scaleY(0.3);
            filter: hue-rotate(90deg) blur(30px);
          }
          50% {
            transform: scaleY(1);
            filter: hue-rotate(180deg) blur(10px);
          }
          100% {
            transform: scaleY(0.3);
            filter: hue-rotate(360deg) blur(0px);
          }
        }
        .animate-wave {
          animation: wave 1.5s linear infinite;
          transform-origin: bottom center;
        }
      `}</style>
    </Container>
  );
}
