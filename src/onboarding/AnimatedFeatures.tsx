export default function AnimatedFeatures() {
  return (
    <div className="onboarding-illustration">
      <svg viewBox="0 0 240 240" width="240" height="240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#f5f5f5" className="pulse-circle" />

        <g className="feature-card card-1">
          <rect x="40" y="55" width="160" height="40" rx="12" fill="white" stroke="#e5e5e5" strokeWidth="2" />
          <rect x="56" y="67" width="56" height="6" rx="3" fill="#222" />
          <rect x="56" y="77" width="36" height="4" rx="2" fill="#ccc" />
          <circle cx="176" cy="75" r="10" fill="#222" />
          <path d="M172 75L175 78L181 72" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g className="feature-card card-2">
          <rect x="40" y="103" width="160" height="40" rx="12" fill="white" stroke="#e5e5e5" strokeWidth="2" />
          <rect x="56" y="115" width="48" height="6" rx="3" fill="#222" />
          <rect x="56" y="125" width="28" height="4" rx="2" fill="#ccc" />
          <g className="slider-group">
            <rect x="140" y="121" width="48" height="4" rx="2" fill="#e5e5e5" />
            <rect x="140" y="121" width="30" height="4" rx="2" fill="#222" className="slider-fill" />
            <circle cx="170" cy="123" r="6" fill="#222" className="slider-thumb" />
          </g>
        </g>

        <g className="feature-card card-3">
          <rect x="40" y="151" width="160" height="40" rx="12" fill="white" stroke="#e5e5e5" strokeWidth="2" />
          <rect x="56" y="163" width="40" height="6" rx="3" fill="#222" />
          <rect x="56" y="173" width="24" height="4" rx="2" fill="#ccc" />
          <g className="toggle-group">
            <rect x="158" y="164" width="32" height="18" rx="9" fill="#222" className="toggle-track" />
            <circle cx="181" cy="173" r="6.5" fill="white" className="toggle-dot" />
          </g>
        </g>

        <g className="sparkles">
          <circle cx="28" cy="95" r="3" fill="#222" className="sparkle sparkle-1" />
          <circle cx="212" cy="140" r="2.5" fill="#222" className="sparkle sparkle-2" />
          <circle cx="35" cy="175" r="2" fill="#222" className="sparkle sparkle-3" />
          <circle cx="205" cy="65" r="3" fill="#222" className="sparkle sparkle-4" />
        </g>
      </svg>
    </div>
  )
}
