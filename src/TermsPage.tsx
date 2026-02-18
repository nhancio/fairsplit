interface TermsPageProps {
  onBack: () => void
}

export default function TermsPage({ onBack }: TermsPageProps) {
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
          <h2 className="text-xl font-semibold text-black absolute left-1/2 transform -translate-x-1/2">Terms & Conditions</h2>
          <div className="w-10" />
        </div>

        <div className="space-y-6 animate-in">
          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Acceptance of Terms</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              By accessing and using FairSplit, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use the application.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Use of Service</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              FairSplit is a rent-splitting calculator provided as a free tool for personal use. The calculations are intended as suggestions only and should not be considered as financial or legal advice. Users are responsible for reviewing and agreeing upon final rent amounts among themselves.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Disclaimer</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              The application is provided "as is" without warranties of any kind, either express or implied. Approtic Solutions Private Limited does not guarantee the accuracy, completeness, or usefulness of the calculations provided.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Limitation of Liability</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              In no event shall Approtic Solutions Private Limited be liable for any damages arising out of or in connection with the use of FairSplit. This includes, without limitation, any direct, indirect, incidental, or consequential damages.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Intellectual Property</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              All content, design, and functionality of FairSplit are the property of Approtic Solutions Private Limited and are protected by applicable intellectual property laws.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Contact</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              For questions regarding these terms, please contact us at{' '}
              <a href="mailto:abhinay@approtic" className="text-black font-medium underline underline-offset-2">
                abhinay@approtic
              </a>.
            </p>
          </div>

          <p className="text-neutral-400 text-xs text-center pt-2">
            Approtic Solutions Private Limited
          </p>
        </div>
      </div>
    </div>
  )
}
