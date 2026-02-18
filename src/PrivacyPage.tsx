interface PrivacyPageProps {
  onBack: () => void
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
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
          <h2 className="text-xl font-semibold text-black absolute left-1/2 transform -translate-x-1/2">Privacy Policy</h2>
          <div className="w-10" />
        </div>

        <div className="space-y-6 animate-in">
          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Data Collection</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              FairSplit does not collect, store, or transmit any personal data. All calculations are performed locally on your device. No information is sent to any server or third party.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Local Storage</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              The app may use your browser's local storage to cache application files for offline use. This data never leaves your device and can be cleared at any time through your browser settings.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Third-Party Services</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              FairSplit does not integrate with any third-party analytics, advertising, or tracking services. Your usage of the app is completely private.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Changes to This Policy</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be reflected within the app. Continued use of FairSplit after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-black font-semibold text-lg mb-3">Contact</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              If you have questions about this privacy policy, please contact us at{' '}
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
