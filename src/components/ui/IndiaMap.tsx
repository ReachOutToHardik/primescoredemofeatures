'use client'

export default function IndiaMap() {
  return (
    <div className="relative w-full select-none" style={{ maxWidth: 540 }}>
      {/* Ambient glow behind map */}
      <div
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
        style={{ filter: 'blur(60px)' }}
      >
        <div
          className="w-3/4 h-3/4 rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(29,78,216,0.12) 0%, rgba(15,37,87,0.06) 60%, transparent 100%)',
            animationDuration: '5s',
          }}
        />
      </div>

      {/* Directly render the custom network graphics map illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/india-map/india-map-network.png"
        alt="Primescore India Wide Support Network Map"
        width={540}
        height={540}
        className="relative z-10 w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        draggable={false}
      />

      {/* "India-wide operations" label */}
      <div className="flex items-center justify-center gap-2 mt-5">
        <div className="h-px w-8 bg-brandNavy/20" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brandNavy/40">
          India-wide operations
        </span>
        <div className="h-px w-8 bg-brandNavy/20" />
      </div>
    </div>
  )
}
