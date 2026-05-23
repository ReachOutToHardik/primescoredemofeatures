'use client'

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Wifi,
  Battery,
  Signal,
  Download,
  Menu,
  Bell,
} from 'lucide-react';

export default function PhoneShowcaseDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex justify-center items-center h-[500px] md:h-[700px] w-full"
      style={{ perspective: "2000px" }}
    >
      {/* Dynamic Glows behind phone */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-0">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          className="absolute inset-0 bg-brandBlue/5 blur-[120px] rounded-full"
        />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brandRed/5 blur-[80px] rounded-full" />
      </div>

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{
          opacity: 0,
          scale: 0.7,
          y: 200,
          rotateX: "45deg",
          rotateY: "-20deg",
          z: -500
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -15, 0],
          rotateX: ["45deg", "0deg"],
          rotateY: ["-20deg", "0deg"],
          z: 0
        }}
        transition={{
          opacity: { duration: 1.5, ease: "easeOut" },
          scale: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
          y: {
            duration: 5,
            times: [0, 0.5, 1],
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotateX: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
          rotateY: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
          z: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
        }}
        className="relative w-[260px] md:w-[320px] h-[520px] md:h-[640px] bg-black rounded-[45px] md:rounded-[54px] border-[5px] md:border-[8px] border-[#1a1a1a] cursor-grab active:cursor-grabbing overflow-hidden z-20"
      >
        {/* Phone Bezel/Frame Thickness Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-black to-gray-800 rounded-[50px] -z-10 translate-z-[-25px]" />

        {/* Main Phone Body */}
        <div className="relative w-full h-full rounded-[40px] md:rounded-[46px] overflow-hidden bg-white">

          {/* iPhone Status Bar */}
          <div className="absolute top-0 left-0 w-full h-12 flex justify-between items-end px-8 pb-1 z-20 text-black">
            <span className="text-[13px] font-bold">9:41</span>
            <div className="flex items-center gap-1.5 opacity-80">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-black" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30" />

          {/* Content Area */}
          <div className="w-full h-full flex flex-col pt-10">
            {/* Header Container */}
            <div className="px-5 pt-4 pb-2 flex justify-between items-center text-slate-800">
              <Menu className="w-6 h-6" />
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brandRed rounded-full border border-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-brandNavy flex items-center justify-center text-white text-xs font-bold">
                  H
                </div>
              </div>
            </div>

            <div className="px-5 py-4">
              <h2 className="text-2xl font-bold text-slate-900 leading-tight font-display">Multi Bureau</h2>
              <p className="text-xs text-slate-400 font-body">Credit report for Hardik</p>
            </div>

            {/* Primary Action Button */}
            <div className="px-5 mb-6">
              <button className="w-full bg-brandNavy text-white py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform">
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>

            {/* Score Card Section */}
            <div className="px-5 mb-8">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 pt-2">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1 text-center">Avg Score</div>
                  <div className="text-2xl font-black text-brandNavy text-center font-display">740</div>
                </div>

                <div className="w-full flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl font-bold text-brandNavy border border-slate-100 font-display">
                    H
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-bold text-brandNavy font-display">Hardik</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase font-body">PAN: KMMP****R</div>
                  </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-body">PAN</div>
                    <div className="text-xs font-bold text-brandNavy font-mono">KMMPS****R</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-body">DOB</div>
                    <div className="text-xs font-bold text-brandNavy font-body">15 Aug 1995</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison UI */}
            <div className="px-5 mb-8">
              <div className="space-y-6">
                <div className="grid grid-cols-5 text-[10px] font-black text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-50">
                  <div className="col-span-1">Metric</div>
                  <div className="text-center text-brandGreen">CIBIL</div>
                  <div className="text-center text-brandBlue">CRIF</div>
                  <div className="text-center text-brandYellow">EXP</div>
                  <div className="text-center text-brandRed">EQU</div>
                </div>

                {[
                  { label: "Accounts", values: ["12", "12", "11", "12"] },
                  { label: "Enquiries", values: ["2", "3", "1", "2"] },
                  { label: "Score", values: ["745", "738", "742", "735"], isLarge: true },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-5 items-center py-2">
                    <div className="col-span-1 text-[10px] font-bold text-brandNavy leading-tight pr-2">
                      {row.label}
                    </div>
                    {row.values.map((val, idx) => (
                      <div key={idx} className={`text-center font-bold ${row.isLarge ? "text-sm text-brandNavy font-display" : "text-[10px] text-slate-600 font-body"}`}>
                        {val}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reflection Layer */}
        <div className="absolute inset-x-[10px] inset-y-[10px] rounded-[40px] bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-40" />
      </motion.div>

      {/* Premium Contact Shadow Below */}
      <motion.div
        style={{
          scale: useTransform(mouseYSpring, [-0.5, 0.5], [1.1, 0.9]),
          opacity: useTransform(mouseYSpring, [-0.5, 0.5], [0.3, 0.15]),
          x: useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]),
        }}
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[220px] md:w-[280px] h-[40px] bg-black/40 blur-[40px] rounded-[100%] z-0"
      />
    </div>
  );
}
