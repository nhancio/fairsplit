export default function AnimatedHouse() {
  return (
    <div className="onboarding-illustration">
      <svg viewBox="0 0 240 240" width="240" height="240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#f5f5f5" className="pulse-circle" />

        <g className="house-float">
          <path
            d="M120 50L60 100V180H180V100L120 50Z"
            fill="white"
            stroke="#222"
            strokeWidth="3"
            strokeLinejoin="round"
            className="house-body draw-stroke"
          />
          <path
            d="M50 105L120 45L190 105"
            stroke="#222"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="roof-line draw-stroke"
          />
          <line
            x1="120"
            y1="45"
            x2="120"
            y2="180"
            stroke="#222"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="split-line"
          />
        </g>

        <g className="left-side fade-in-left">
          <rect x="78" y="118" width="28" height="22" rx="2" fill="none" stroke="#222" strokeWidth="2" className="bed-frame" />
          <rect x="82" y="114" width="20" height="6" rx="3" fill="#222" className="pillow" />
          <line x1="74" y1="140" x2="110" y2="140" stroke="#222" strokeWidth="2" />
        </g>

        <g className="right-side fade-in-right">
          <g className="calc-bounce">
            <rect x="132" y="108" width="36" height="44" rx="4" fill="#222" />
            <rect x="136" y="112" width="28" height="10" rx="2" fill="#555" />
            <rect x="136" y="126" width="8" height="8" rx="1.5" fill="#888" className="calc-btn-1" />
            <rect x="148" y="126" width="8" height="8" rx="1.5" fill="#888" className="calc-btn-2" />
            <rect x="136" y="138" width="8" height="8" rx="1.5" fill="#888" className="calc-btn-3" />
            <rect x="148" y="138" width="8" height="8" rx="1.5" fill="#888" className="calc-btn-4" />
          </g>
        </g>

        <g className="sparkles">
          <circle cx="55" cy="70" r="3" fill="#222" className="sparkle sparkle-1" />
          <circle cx="185" cy="65" r="2.5" fill="#222" className="sparkle sparkle-2" />
          <circle cx="45" cy="150" r="2" fill="#222" className="sparkle sparkle-3" />
          <circle cx="195" cy="155" r="3" fill="#222" className="sparkle sparkle-4" />
        </g>
      </svg>
    </div>
  )
}
