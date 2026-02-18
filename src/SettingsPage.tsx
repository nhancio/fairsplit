interface SettingsPageProps {
  onBack: () => void
  onNavigate: (page: 'privacy' | 'terms') => void
}

export default function SettingsPage({ onBack, onNavigate }: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto p-6 pb-8">
        <div className="flex items-center justify-between mb-8 pt-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-black hover:bg-neutral-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-black absolute left-1/2 transform -translate-x-1/2">Settings</h2>
          <div className="w-10" />
        </div>

        <div className="space-y-3 animate-in">
          <button
            onClick={() => onNavigate('privacy')}
            className="w-full border border-neutral-200 rounded-2xl p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L4 5V9.5C4 13.64 6.56 17.5 10 18.5C13.44 17.5 16 13.64 16 9.5V5L10 2Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-black font-medium">Privacy Policy</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={() => onNavigate('terms')}
            className="w-full border border-neutral-200 rounded-2xl p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 2H14C15.1 2 16 2.9 16 4V16C16 17.1 15.1 18 14 18H6C4.9 18 4 17.1 4 16V4C4 2.9 4.9 2 6 2Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 6H13M7 10H13M7 14H10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-black font-medium">Terms & Conditions</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <a
            href="mailto:abhinay@approtic"
            className="w-full border border-neutral-200 rounded-2xl p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="4" width="16" height="12" rx="2" stroke="black" strokeWidth="1.5"/>
                  <path d="M2 6L10 11L18 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-left">
                <span className="text-black font-medium block">Support</span>
                <span className="text-neutral-400 text-sm">abhinay@approtic</span>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="mt-12 text-center animate-in animate-in-delay-1">
          <img
            src="/ChatGPT_Image_Feb_17,_2026,_08_17_48_PM.png"
            alt="FairSplit"
            className="w-14 h-14 rounded-xl object-cover mx-auto mb-3"
          />
          <p className="text-black font-semibold text-sm">FairSplit</p>
          <p className="text-neutral-400 text-xs mt-1">Version 1.0.0</p>
          <p className="text-neutral-400 text-xs mt-3">Approtic Solutions Private Limited</p>
        </div>
      </div>
    </div>
  )
}
