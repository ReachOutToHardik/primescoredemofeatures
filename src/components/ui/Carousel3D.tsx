'use client'

import { useState, useEffect, useRef } from 'react';

const FEATURES = [
  { id: 1, image: '/carousel/c_img1.jpg' },
  { id: 2, image: '/carousel/c_img2.jpg' },
  { id: 3, image: '/carousel/c_img3.jpg' },
  { id: 4, image: '/carousel/c_img4.jpg' },
  { id: 5, image: '/carousel/c_img5.jpg' },
  { id: 6, image: '/carousel/c_img6.jpg' },
  { id: 7, image: '/carousel/c_img7.jpg' }
];

function FeatureCard({ image }: { image: string }) {
  return (
    <div
      className="group relative flex-shrink-0 w-96 h-[540px] rounded-[1rem] overflow-hidden shadow-2xl border border-white/10 cursor-pointer origin-center transition-all duration-500 hover:scale-[1.02] hover:brightness-110 bg-slate-900 gpu-accelerated"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <img
        src={image}
        alt="Feature Preview"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 border border-white/20 rounded-[1rem] pointer-events-none"></div>
    </div>
  );
}

export default function Carousel3D() {
  // Display items in continuous sequential order: 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7
  const displayFeatures = [
    FEATURES[0], // 1
    FEATURES[1], // 2
    FEATURES[2], // 3
    FEATURES[3], // 4
    FEATURES[4], // 5
    FEATURES[5], // 6
    FEATURES[6], // 7
    FEATURES[0], // 1
    FEATURES[1], // 2
    FEATURES[2], // 3
    FEATURES[3], // 4
    FEATURES[4], // 5
    FEATURES[5], // 6
    FEATURES[6]  // 7
  ];

  const totalCards = displayFeatures.length;
  const radius = 950;
  const step = 360 / totalCards;

  return (
    <div className="relative w-full overflow-hidden pt-10">
      <div className="text-center relative z-30 px-4">
        <h2 className="font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
          Everything you need,<br />in one place
        </h2>
        <p className="mt-4 text-base text-textSecondary">
          A premium suite of tools to take back control of your financial future.
        </p>
      </div>

      {/* Inject custom CSS Keyframe animation on compiling */}
      <style jsx global>{`
        @keyframes spin3D {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(-360deg);
          }
        }
        .carousel-track-3d {
          animation: spin3D 45s linear infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
      `}</style>

      <div
        className="relative w-full h-[650px] overflow-hidden flex items-center justify-center mt-10"
        style={{ perspective: "1000px" }}
      >
        <div className="relative w-full h-full flex items-center justify-center carousel-track-3d">
          {displayFeatures.map((lang, i) => {
            const angle = (i * step);
            return (
              <div
                key={`${lang.id}-${i}`}
                className="absolute"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) rotateY(180deg)`,
                  backfaceVisibility: 'hidden',
                  transformStyle: "preserve-3d",
                  willChange: 'transform'
                }}
              >
                <FeatureCard 
                  image={lang.image} 
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
