import { useState } from 'react'
import AnimatedHouse from './AnimatedHouse'
import AnimatedFeatures from './AnimatedFeatures'
import AnimatedChart from './AnimatedChart'

interface OnboardingProps {
  onComplete: () => void
}

const slides = [
  {
    illustration: AnimatedHouse,
    title: 'Split Rent Fairly',
    subtitle: 'No more arguments. FairSplit uses a smart algorithm to calculate what each person should pay based on actual room value.',
  },
  {
    illustration: AnimatedFeatures,
    title: 'Every Detail Counts',
    subtitle: 'Room size, private bath, natural light, noise level -- every feature is weighted to ensure a truly fair result.',
  },
  {
    illustration: AnimatedChart,
    title: 'Transparent Results',
    subtitle: 'See exactly how each amount is calculated. Share results instantly with your roommates.',
  },
]

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [animating, setAnimating] = useState(false)

  const goTo = (index: number) => {
    if (animating || index === current) return
    setDirection(index > current ? 'next' : 'prev')
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 300)
  }

  const next = () => {
    if (current < slides.length - 1) {
      goTo(current + 1)
    } else {
      onComplete()
    }
  }

  const slide = slides[current]
  const Illustration = slide.illustration

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <div className="flex justify-end p-6">
        {current < slides.length - 1 && (
          <button
            onClick={onComplete}
            className="text-neutral-400 text-sm font-medium hover:text-neutral-600 transition-colors"
          >
            Skip
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        <div
          className={`onboarding-slide ${animating ? (direction === 'next' ? 'slide-exit-left' : 'slide-exit-right') : 'slide-enter'}`}
        >
          <div className="mb-10">
            <Illustration />
          </div>

          <h2 className="text-3xl font-bold text-black text-center mb-4">
            {slide.title}
          </h2>
          <p className="text-neutral-500 text-center text-base leading-relaxed max-w-xs mx-auto">
            {slide.subtitle}
          </p>
        </div>
      </div>

      <div className="px-8 pb-12 max-w-md mx-auto w-full">
        <div className="flex items-center justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-black w-8'
                  : 'bg-neutral-200 w-2 hover:bg-neutral-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="bg-black text-white w-full font-semibold py-4 rounded-xl text-lg hover:bg-neutral-800 active:scale-[0.98] transition-all"
        >
          {current === slides.length - 1 ? 'Get Started' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
