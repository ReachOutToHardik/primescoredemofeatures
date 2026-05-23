'use client'

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Wifi,
  Battery,
  Signal,
  Download,
  Home,
  BarChart3,
  AlertCircle,
  User,
  Menu,
  Bell,
} from 'lucide-react';

export default function PhoneShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const shadowScale  = useTransform(mouseYSpring, [-0.5, 0.5], [1.1, 0.9]);
  const shadowOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0.3, 0.15]);
  const shadowX      = useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
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
      className="relative flex justify-center items-center h-[520px] md:h-[700px] w-full scale-[0.85] sm:scale-100"
      style={{ perspective: "2000px" }}
    >
      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-0">
        <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} className="absolute inset-0 bg-brandBlue/5 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brandRed/5 blur-[80px] rounded-full" />
      </div>

      {/* Phone shell */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.7, y: 200, rotateX: "45deg", rotateY: "-20deg", z: -500 }}
        animate={{ opacity: 1, scale: 1, y: [0, -15, 0], rotateX: ["45deg", "0deg"], rotateY: ["-20deg", "0deg"], z: 0 }}
        transition={{
          opacity: { duration: 1.5, ease: "easeOut" },
          scale:   { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
          y:       { duration: 5, times: [0, 0.5, 1], repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
          rotateY: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
          z:       { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative w-[240px] md:w-[320px] h-[490px] md:h-[640px] bg-black rounded-[44px] md:rounded-[54px] border-[5px] md:border-[8px] border-[#1a1a1a] cursor-grab active:cursor-grabbing overflow-hidden z-20"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-black to-gray-800 rounded-[50px] -z-10" />

        {/* Inner screen */}
        <div className="relative w-full h-full rounded-[39px] md:rounded-[46px] overflow-hidden bg-white">

          {/* Status bar */}
          <div className="absolute top-0 left-0 w-full h-9 flex justify-between items-end px-5 pb-1 z-20 text-black">
            <span className="text-[11px] font-bold">9:41</span>
            <div className="flex items-center gap-1 opacity-80">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 fill-black" />
            </div>
          </div>

          {/* Dynamic island */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-30" />

          {/* Scrollable content */}
          <div className="w-full h-full flex flex-col overflow-y-auto no-scrollbar pt-8">

            {/* Header */}
            <div className="px-3.5 pt-2 pb-1 flex justify-between items-center text-slate-800">
              <Menu className="w-4 h-4" />
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bell className="w-3.5 h-3.5 text-slate-400" />
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-brandRed rounded-full border border-white" />
                </div>
                <div className="w-6 h-6 rounded-full bg-brandNavy flex items-center justify-center text-white text-[9px] font-bold">H</div>
              </div>
            </div>

            {/* Title */}
            <div className="px-3.5 py-1.5">
              <h2 className="text-base font-bold text-slate-900 leading-tight font-display">Multi Bureau</h2>
              <p className="text-[9px] text-slate-400 font-body">Credit report for Hardik</p>
            </div>

            {/* CTA button */}
            <div className="px-3.5 mb-2.5">
              <button className="w-full bg-brandNavy text-white py-2 rounded-xl font-bold text-[9px] flex items-center justify-center gap-1.5 shadow-md">
                <Download className="w-3 h-3" />
                Download Report
              </button>
            </div>

            {/* Score card */}
            <div className="px-3.5 mb-3">
              <div className="bg-white rounded-xl border border-slate-100 p-2.5 shadow-sm flex flex-col relative overflow-hidden">
                {/* Avg score badge */}
                <div className="absolute top-0 right-0 p-2.5 pt-2">
                  <div className="text-[7px] text-slate-400 uppercase font-bold tracking-widest mb-0.5 text-center">Avg Score</div>
                  <div className="text-xl font-black text-brandNavy text-center font-display leading-none">740</div>
                </div>

                {/* User row */}
                <div className="flex items-center gap-2.5 mb-3 mt-1">
                  <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-[15px] font-bold text-brandNavy border border-slate-100 font-display shrink-0">H</div>
                  <div className="flex-1 min-w-0 pr-12">
                    <div className="text-[13px] font-bold text-brandNavy font-display leading-tight">Hardik</div>
                    <div className="text-[7.5px] text-slate-400 font-medium uppercase font-body mt-0.5">PAN: KMMP****R</div>
                  </div>
                </div>

                {/* PAN / DOB */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[7px] text-slate-400 uppercase font-bold tracking-wider">PAN</div>
                    <div className="text-[8.5px] font-bold text-brandNavy font-mono mt-0.5">KMMP****R</div>
                  </div>
                  <div>
                    <div className="text-[7px] text-slate-400 uppercase font-bold tracking-wider">DOB</div>
                    <div className="text-[8.5px] font-bold text-brandNavy mt-0.5">15 Aug 1995</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-3.5 mb-2 overflow-x-auto no-scrollbar pb-1">
              <div className="flex items-center gap-2.5 border-b border-slate-100 min-w-max pb-1 px-1">
                {["Overview", "Accounts", "Enquiries", "Comparison"].map((tab) => (
                  <button
                    key={tab}
                    className={`text-[8.5px] font-bold pb-1.5 px-1.5 relative whitespace-nowrap ${tab === "Comparison" ? "text-brandNavy" : "text-slate-400"}`}
                  >
                    {tab}
                    {tab === "Comparison" && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-brandNavy rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            <div className="px-3.5 mb-3">
              <div className="space-y-2">
                <div className="grid grid-cols-5 text-[7.5px] font-black text-slate-400 uppercase tracking-widest pb-1 border-b border-slate-50">
                  <div className="col-span-1">Metric</div>
                  <div className="text-center text-brandGreen">CIBIL</div>
                  <div className="text-center text-brandBlue">CRIF</div>
                  <div className="text-center text-brandYellow">EXP</div>
                  <div className="text-center text-brandRed">EQU</div>
                </div>
                {[
                  { label: "Accounts",  values: ["12", "12", "11", "12"] },
                  { label: "Enquiries", values: ["2",  "3",  "1",  "2"]  },
                  { label: "Score",     values: ["745","738","742","735"], isLarge: true },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-5 items-center py-1.5">
                    <div className="col-span-1 text-[7.5px] font-bold text-brandNavy leading-tight pr-1">{row.label}</div>
                    {row.values.map((val, idx) => (
                      <div key={idx} className={`text-center font-bold ${row.isLarge ? "text-[10.5px] text-brandNavy font-display" : "text-[8px] text-slate-600"}`}>
                        {val}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom nav */}
            <div className="mt-auto bg-white border-t border-slate-100 flex justify-between items-center px-5 py-2.5 z-20">
              <Home className="w-4 h-4 text-brandBlue" />
              <BarChart3 className="w-4 h-4 text-slate-300" />
              <AlertCircle className="w-4 h-4 text-slate-300" />
              <User className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Reflection */}
        <div className="absolute inset-x-[10px] inset-y-[10px] rounded-[40px] bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-40" />
      </motion.div>

      {/* Contact shadow */}
      <motion.div
        style={{ scale: shadowScale, opacity: shadowOpacity, x: shadowX }}
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[180px] md:w-[280px] h-[40px] bg-black/40 blur-[40px] rounded-[100%] z-0"
      />
    </div>
  );
}
