export default function AnimatedChart() {
  return (
    <div className="onboarding-illustration">
      <svg viewBox="0 0 240 240" width="240" height="240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="120" r="110" fill="#f5f5f5" className="pulse-circle" />

        <g className="chart-group">
          <line x1="55" y1="185" x2="185" y2="185" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" />
          <line x1="55" y1="155" x2="185" y2="155" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="55" y1="125" x2="185" y2="125" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="55" y1="95" x2="185" y2="95" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="4 4" />

          <rect x="65" y="110" width="28" height="75" rx="6" fill="#222" className="bar bar-1" />
          <rect x="105" y="130" width="28" height="55" rx="6" fill="#555" className="bar bar-2" />
          <rect x="145" y="145" width="28" height="40" rx="6" fill="#999" className="bar bar-3" />

          <g className="label-group label-1">
            <text x="79" y="102" textAnchor="middle" fill="#222" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">A</text>
          </g>
          <g className="label-group label-2">
            <text x="119" y="122" textAnchor="middle" fill="#555" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">B</text>
          </g>
          <g className="label-group label-3">
            <text x="159" y="137" textAnchor="middle" fill="#999" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">C</text>
          </g>
        </g>

        <g className="balance-icon">
          <circle cx="120" cy="50" r="16" fill="white" stroke="#222" strokeWidth="2" />
          <path d="M112 50L118 56L128 44" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="check-draw" />
        </g>

        <g className="coin-float">
          <circle cx="42" cy="80" r="8" fill="#222" className="coin coin-1" />
          <text x="42" y="84" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">$</text>
        </g>
        <g className="coin-float-2">
          <circle cx="198" cy="90" r="7" fill="#555" className="coin coin-2" />
          <text x="198" y="94" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">$</text>
        </g>

        <g className="sparkles">
          <circle cx="50" cy="55" r="2.5" fill="#222" className="sparkle sparkle-1" />
          <circle cx="190" cy="55" r="2" fill="#222" className="sparkle sparkle-2" />
          <circle cx="30" cy="130" r="3" fill="#222" className="sparkle sparkle-3" />
          <circle cx="210" cy="170" r="2.5" fill="#222" className="sparkle sparkle-4" />
        </g>
      </svg>
    </div>
  )
}
