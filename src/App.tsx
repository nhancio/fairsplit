import { useState } from 'react'
import { getCurrencySymbol } from './currencies'
import CurrencyPicker from './CurrencyPicker'
import SettingsPage from './SettingsPage'
import PrivacyPage from './PrivacyPage'
import TermsPage from './TermsPage'
import Onboarding from './onboarding/Onboarding'

type Screen = 'onboarding' | 'welcome' | 'setup' | 'config' | 'results' | 'settings' | 'privacy' | 'terms'
type LightLevel = 'High' | 'Med' | 'Low'
type NoiseLevel = 'Low' | 'Med' | 'High'

interface RoomData {
  sqft: number
  privateBath: boolean
  walkInCloset: boolean
  windows: number
  naturalLight: LightLevel
  noiseLevel: NoiseLevel
}

function App() {
  const hasSeenOnboarding = localStorage.getItem('fairsplit_onboarding_done') === 'true'
  const [screen, setScreen] = useState<Screen>(hasSeenOnboarding ? 'welcome' : 'onboarding')
  const [totalRent, setTotalRent] = useState(2400)
  const [roomCount, setRoomCount] = useState(3)
  const [currency, setCurrency] = useState('USD')
  const [activeRoom, setActiveRoom] = useState(0)
  const [rooms, setRooms] = useState<RoomData[]>([
    { sqft: 180, privateBath: true, walkInCloset: false, windows: 2, naturalLight: 'High', noiseLevel: 'Low' },
    { sqft: 140, privateBath: false, walkInCloset: false, windows: 1, naturalLight: 'Med', noiseLevel: 'Med' },
    { sqft: 110, privateBath: false, walkInCloset: false, windows: 1, naturalLight: 'Low', noiseLevel: 'High' },
  ])

  const currencySymbol = getCurrencySymbol(currency)

  const updateRoom = (index: number, data: Partial<RoomData>) => {
    const newRooms = [...rooms]
    newRooms[index] = { ...newRooms[index], ...data }
    setRooms(newRooms)
  }

  const calculateRent = () => {
    const totalSqft = rooms.reduce((sum, room) => sum + room.sqft, 0)
    const maxWindows = Math.max(...rooms.map(r => r.windows))

    const scores = rooms.map(room => {
      let score = 0
      score += (room.sqft / totalSqft) * 40
      score += room.privateBath ? 15 : 0
      score += room.walkInCloset ? 10 : 0
      score += (room.windows / maxWindows) * 10
      score += room.naturalLight === 'High' ? 10 : room.naturalLight === 'Med' ? 5 : 0
      score += room.noiseLevel === 'Low' ? 15 : room.noiseLevel === 'Med' ? 7 : 0
      return score
    })

    const totalScore = scores.reduce((sum, score) => sum + score, 0)
    return scores.map(score => (score / totalScore) * totalRent)
  }

  const handleRoomCountChange = (count: number) => {
    setRoomCount(count)
    const defaultRooms: RoomData[] = [
      { sqft: 180, privateBath: true, walkInCloset: false, windows: 2, naturalLight: 'High', noiseLevel: 'Low' },
      { sqft: 140, privateBath: false, walkInCloset: false, windows: 1, naturalLight: 'Med', noiseLevel: 'Med' },
      { sqft: 110, privateBath: false, walkInCloset: false, windows: 1, naturalLight: 'Low', noiseLevel: 'High' },
      { sqft: 120, privateBath: false, walkInCloset: false, windows: 2, naturalLight: 'Med', noiseLevel: 'Med' },
      { sqft: 130, privateBath: true, walkInCloset: true, windows: 2, naturalLight: 'High', noiseLevel: 'Low' },
      { sqft: 100, privateBath: false, walkInCloset: false, windows: 1, naturalLight: 'Low', noiseLevel: 'High' },
    ]
    setRooms(defaultRooms.slice(0, count))
    setActiveRoom(0)
  }

  const shareResults = async () => {
    const rentAmounts = calculateRent()
    const text = `FairSplit Results:\n\n${rooms.map((_, i) =>
      `Room ${String.fromCharCode(65 + i)}: ${currencySymbol}${rentAmounts[i].toFixed(0)}`
    ).join('\n')}\n\nTotal: ${currencySymbol}${totalRent.toLocaleString()}`

    if (navigator.share) {
      try {
        await navigator.share({ title: 'FairSplit Results', text })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(text)
      alert('Results copied to clipboard!')
    }
  }

  if (screen === 'onboarding') {
    return (
      <Onboarding onComplete={() => {
        localStorage.setItem('fairsplit_onboarding_done', 'true')
        setScreen('welcome')
      }} />
    )
  }

  if (screen === 'settings') {
    return <SettingsPage onBack={() => setScreen('welcome')} onNavigate={(page) => setScreen(page)} />
  }

  if (screen === 'privacy') {
    return <PrivacyPage onBack={() => setScreen('settings')} />
  }

  if (screen === 'terms') {
    return <TermsPage onBack={() => setScreen('settings')} />
  }

  if (screen === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-between p-8 py-16 bg-white">
        <button
          onClick={() => setScreen('settings')}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-50 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.17 12.5C16.06 12.75 16.03 13.03 16.09 13.29C16.15 13.56 16.29 13.8 16.5 13.98L16.55 14.03C16.72 14.2 16.85 14.4 16.94 14.62C17.03 14.84 17.07 15.08 17.07 15.32C17.07 15.56 17.03 15.8 16.94 16.02C16.85 16.24 16.72 16.44 16.55 16.61C16.38 16.78 16.18 16.91 15.96 17C15.74 17.09 15.5 17.13 15.26 17.13C15.02 17.13 14.78 17.09 14.56 17C14.34 16.91 14.14 16.78 13.97 16.61L13.92 16.56C13.74 16.35 13.5 16.21 13.23 16.15C12.97 16.09 12.69 16.12 12.44 16.23C12.2 16.33 11.99 16.5 11.85 16.72C11.71 16.94 11.63 17.19 11.63 17.45V17.58C11.63 18.07 11.44 18.54 11.09 18.89C10.74 19.24 10.27 19.43 9.78 19.43C9.29 19.43 8.82 19.24 8.47 18.89C8.12 18.54 7.93 18.07 7.93 17.58V17.51C7.92 17.24 7.83 16.98 7.67 16.76C7.52 16.55 7.3 16.39 7.05 16.3C6.8 16.19 6.52 16.16 6.26 16.22C5.99 16.28 5.75 16.42 5.57 16.63L5.52 16.68C5.35 16.85 5.15 16.98 4.93 17.07C4.71 17.16 4.47 17.2 4.23 17.2C3.99 17.2 3.75 17.16 3.53 17.07C3.31 16.98 3.11 16.85 2.94 16.68C2.77 16.51 2.64 16.31 2.55 16.09C2.46 15.87 2.42 15.63 2.42 15.39C2.42 15.15 2.46 14.91 2.55 14.69C2.64 14.47 2.77 14.27 2.94 14.1L2.99 14.05C3.2 13.87 3.34 13.63 3.4 13.36C3.46 13.1 3.43 12.82 3.32 12.57C3.22 12.33 3.05 12.12 2.83 11.98C2.61 11.84 2.36 11.76 2.1 11.76H1.97C1.48 11.76 1.01 11.57 0.66 11.22C0.31 10.87 0.12 10.4 0.12 9.91C0.12 9.42 0.31 8.95 0.66 8.6C1.01 8.25 1.48 8.06 1.97 8.06H2.04C2.31 8.05 2.57 7.96 2.79 7.8C3.01 7.65 3.16 7.43 3.25 7.18C3.36 6.93 3.39 6.65 3.33 6.39C3.27 6.12 3.13 5.88 2.92 5.7L2.87 5.65C2.7 5.48 2.57 5.28 2.48 5.06C2.39 4.84 2.35 4.6 2.35 4.36C2.35 4.12 2.39 3.88 2.48 3.66C2.57 3.44 2.7 3.24 2.87 3.07C3.04 2.9 3.24 2.77 3.46 2.68C3.68 2.59 3.92 2.55 4.16 2.55C4.4 2.55 4.64 2.59 4.86 2.68C5.08 2.77 5.28 2.9 5.45 3.07L5.5 3.12C5.68 3.33 5.92 3.47 6.19 3.53C6.45 3.59 6.73 3.56 6.98 3.45H7.05C7.29 3.35 7.5 3.18 7.64 2.96C7.78 2.74 7.86 2.49 7.86 2.23V2.1C7.86 1.61 8.05 1.14 8.4 0.79C8.75 0.44 9.22 0.25 9.71 0.25C10.2 0.25 10.67 0.44 11.02 0.79C11.37 1.14 11.56 1.61 11.56 2.1V2.17C11.56 2.43 11.64 2.68 11.78 2.9C11.92 3.12 12.13 3.29 12.37 3.39C12.62 3.5 12.9 3.53 13.16 3.47C13.43 3.41 13.67 3.27 13.85 3.06L13.9 3.01C14.07 2.84 14.27 2.71 14.49 2.62C14.71 2.53 14.95 2.49 15.19 2.49C15.43 2.49 15.67 2.53 15.89 2.62C16.11 2.71 16.31 2.84 16.48 3.01C16.65 3.18 16.78 3.38 16.87 3.6C16.96 3.82 17 4.06 17 4.3C17 4.54 16.96 4.78 16.87 5C16.78 5.22 16.65 5.42 16.48 5.59L16.43 5.64C16.22 5.82 16.08 6.06 16.02 6.33C15.96 6.59 15.99 6.87 16.1 7.12V7.19C16.2 7.43 16.37 7.64 16.59 7.78C16.81 7.92 17.06 8 17.32 8H17.45C17.94 8 18.41 8.19 18.76 8.54C19.11 8.89 19.3 9.36 19.3 9.85C19.3 10.34 19.11 10.81 18.76 11.16C18.41 11.51 17.94 11.7 17.45 11.7H17.38C17.12 11.7 16.87 11.78 16.65 11.92C16.43 12.06 16.26 12.27 16.17 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
          <div className="mb-8 animate-in">
            <img
              src="/ChatGPT_Image_Feb_17,_2026,_08_17_48_PM.png"
              alt="FairSplit"
              className="w-28 h-28 rounded-2xl object-cover"
            />
          </div>

          <h1 className="text-5xl font-bold text-black mb-3 text-center animate-in animate-in-delay-1">FairSplit</h1>
          <p className="text-neutral-500 text-lg text-center mb-12 leading-relaxed animate-in animate-in-delay-2">
            Split rent fairly. Keep friendships<br />intact.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-12 animate-in animate-in-delay-3">
            <div className="border border-neutral-200 px-5 py-2.5 rounded-full text-neutral-500 text-sm font-medium">
              Smart Algorithm
            </div>
            <div className="border border-neutral-200 px-5 py-2.5 rounded-full text-neutral-500 text-sm font-medium">
              100% Free
            </div>
            <div className="border border-neutral-200 px-5 py-2.5 rounded-full text-neutral-500 text-sm font-medium">
              Offline
            </div>
          </div>
        </div>

        <div className="w-full max-w-md space-y-4 animate-in animate-in-delay-4">
          <button
            onClick={() => setScreen('setup')}
            className="bg-black text-white w-full font-semibold py-4 rounded-xl text-lg hover:bg-neutral-800 active:scale-[0.98] transition-all"
          >
            Get Started
          </button>
          <p className="text-neutral-400 text-sm text-center">
            Privacy first  --  Works completely offline
          </p>
        </div>
      </div>
    )
  }

  if (screen === 'setup') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto p-6 pb-8">
          <div className="flex items-center justify-between mb-8 pt-4">
            <button
              onClick={() => setScreen('welcome')}
              className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-black hover:bg-neutral-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-black absolute left-1/2 transform -translate-x-1/2">Setup</h2>
            <div className="w-10" />
          </div>

          <div className="space-y-4">
            <div className="border border-neutral-200 rounded-2xl p-6 animate-in">
              <label className="text-neutral-500 text-sm block mb-4">Total Monthly Rent</label>
              <div className="flex items-center gap-2 border border-neutral-200 rounded-xl px-5 py-3">
                <span className="text-black text-3xl font-semibold">{currencySymbol}</span>
                <input
                  type="number"
                  value={totalRent || ''}
                  onChange={(e) => setTotalRent(e.target.value === '' ? 0 : Number(e.target.value))}
                  placeholder="0"
                  className="bg-transparent text-black placeholder-neutral-300 text-5xl font-bold w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            <div className="border border-neutral-200 rounded-2xl p-6 animate-in animate-in-delay-1">
              <label className="text-neutral-500 text-sm block mb-4">Number of Rooms</label>
              <div className="flex gap-3">
                {[2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => handleRoomCountChange(num)}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      roomCount === num
                        ? 'bg-black text-white'
                        : 'border border-neutral-200 text-neutral-500 hover:bg-neutral-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-neutral-200 rounded-2xl p-6 animate-in animate-in-delay-2">
              <label className="text-neutral-500 text-sm block mb-4">Currency</label>
              <CurrencyPicker value={currency} onChange={setCurrency} />
            </div>
          </div>

          <button
            onClick={() => setScreen('config')}
            className="bg-black text-white w-full font-semibold py-4 rounded-xl text-lg mt-8 hover:bg-neutral-800 active:scale-[0.98] transition-all animate-in animate-in-delay-3"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'config') {
    const room = rooms[activeRoom]

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto p-6 pb-8">
          <div className="flex items-center justify-between mb-8 pt-4">
            <button
              onClick={() => setScreen('setup')}
              className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-black hover:bg-neutral-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-black absolute left-1/2 transform -translate-x-1/2">Configure Rooms</h2>
            <div className="w-10" />
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {rooms.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveRoom(i)}
                className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeRoom === i
                    ? 'bg-black text-white'
                    : 'border border-neutral-200 text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                Room {String.fromCharCode(65 + i)}
              </button>
            ))}
          </div>

          <div className="space-y-4 mb-8">
            <div className="border border-neutral-200 rounded-2xl p-6 animate-in">
              <label className="text-neutral-500 text-sm block mb-3">Square Feet</label>
              <input
                type="number"
                value={room.sqft || ''}
                onChange={(e) => updateRoom(activeRoom, { sqft: e.target.value === '' ? 0 : Number(e.target.value) })}
                placeholder="0"
                className="border border-neutral-200 bg-white text-black placeholder-neutral-300 text-4xl font-bold w-full py-3 px-5 rounded-xl focus:outline-none focus:border-black transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => updateRoom(activeRoom, { privateBath: !room.privateBath })}
                className={`p-6 rounded-2xl text-left transition-all animate-in animate-in-delay-1 ${
                  room.privateBath
                    ? 'bg-black text-white'
                    : 'border border-neutral-200 text-neutral-500'
                }`}
              >
                <div className="text-sm mb-3 opacity-60">Private Bath</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{room.privateBath ? 'Yes' : 'No'}</div>
                  {room.privateBath && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </button>

              <button
                onClick={() => updateRoom(activeRoom, { walkInCloset: !room.walkInCloset })}
                className={`p-6 rounded-2xl text-left transition-all animate-in animate-in-delay-2 ${
                  room.walkInCloset
                    ? 'bg-black text-white'
                    : 'border border-neutral-200 text-neutral-500'
                }`}
              >
                <div className="text-sm mb-3 opacity-60">Walk-In<br/>Closet</div>
                <div className="text-2xl font-bold">{room.walkInCloset ? 'Yes' : 'No'}</div>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-neutral-200 rounded-2xl p-6 animate-in animate-in-delay-1">
                <label className="text-neutral-500 text-sm block mb-3">Windows</label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => updateRoom(activeRoom, { windows: Math.max(0, room.windows - 1) })}
                    className="w-10 h-10 rounded-full border border-neutral-200 text-black flex items-center justify-center font-bold text-xl hover:bg-neutral-50 transition-colors"
                  >
                    -
                  </button>
                  <div className="text-3xl font-bold text-black">{room.windows}</div>
                  <button
                    onClick={() => updateRoom(activeRoom, { windows: Math.min(5, room.windows + 1) })}
                    className="w-10 h-10 rounded-full border border-neutral-200 text-black flex items-center justify-center font-bold text-xl hover:bg-neutral-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-2xl p-6 animate-in animate-in-delay-2">
                <label className="text-neutral-500 text-sm block mb-3">Natural Light</label>
                <select
                  value={room.naturalLight}
                  onChange={(e) => updateRoom(activeRoom, { naturalLight: e.target.value as LightLevel })}
                  className="border border-neutral-200 bg-white text-black w-full py-2.5 px-4 rounded-xl font-semibold text-lg cursor-pointer focus:outline-none focus:border-black transition-colors"
                >
                  <option value="High">High</option>
                  <option value="Med">Med</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="border border-neutral-200 rounded-2xl p-6 animate-in animate-in-delay-3">
              <label className="text-neutral-500 text-sm block mb-4">Noise Level</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Low', 'Med', 'High'] as NoiseLevel[]).map(level => (
                  <button
                    key={level}
                    onClick={() => updateRoom(activeRoom, { noiseLevel: level })}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      room.noiseLevel === level
                        ? 'bg-black text-white'
                        : 'border border-neutral-200 text-neutral-500 hover:bg-neutral-50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setScreen('results')}
            className="bg-black text-white w-full font-semibold py-4 rounded-xl text-lg hover:bg-neutral-800 active:scale-[0.98] transition-all"
          >
            Calculate Fair Split
          </button>
        </div>
      </div>
    )
  }

  const rentAmounts = calculateRent()
  const equalSplit = totalRent / roomCount
  const maxDifference = Math.max(...rentAmounts.map(amt => Math.abs(amt - equalSplit)))
  const barOpacities = [0.9, 0.65, 0.4, 0.75, 0.55, 0.3]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto p-6 pb-8">
        <div className="flex items-center justify-between mb-8 pt-4">
          <button
            onClick={() => setScreen('config')}
            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-black hover:bg-neutral-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-black absolute left-1/2 transform -translate-x-1/2">Results</h2>
          <div className="w-10" />
        </div>

        <div className="text-center mb-6 animate-in">
          <div className="text-neutral-500 text-sm mb-2">Total Monthly Rent</div>
          <div className="text-5xl font-bold text-black">
            {currencySymbol}{totalRent.toLocaleString()}
          </div>
        </div>

        <div className="h-3 mb-6 flex bg-neutral-100 rounded-full overflow-hidden animate-in animate-in-delay-1">
          {rentAmounts.map((amount, i) => {
            const percentage = (amount / totalRent) * 100
            return (
              <div
                key={i}
                className="h-full rounded-full transition-all duration-600"
                style={{
                  width: `${percentage}%`,
                  background: `rgba(0, 0, 0, ${barOpacities[i]})`,
                  marginRight: i < rentAmounts.length - 1 ? '2px' : '0',
                }}
              />
            )
          })}
        </div>

        <div className="space-y-3 mb-6">
          {rentAmounts.map((amount, i) => {
            const percentage = (amount / totalRent) * 100
            const room = rooms[i]
            const features = []
            features.push(`${room.sqft} sq ft`)
            features.push(`${room.windows} window${room.windows !== 1 ? 's' : ''}`)
            if (room.privateBath) features.push('Bath')

            return (
              <div key={i} className="border border-neutral-200 rounded-2xl p-5 animate-in" style={{ animationDelay: `${0.06 * (i + 2)}s`, opacity: 0 }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: `rgba(0, 0, 0, ${barOpacities[i]})` }} />
                    <div className="text-black font-semibold text-lg">Room {String.fromCharCode(65 + i)}</div>
                  </div>
                  <div className="text-neutral-500 text-sm font-medium">{percentage.toFixed(1)}%</div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-neutral-400 text-sm">{features.join(' -- ')}</div>
                  <div className="text-black text-2xl font-bold">
                    {currencySymbol}{Math.round(amount)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="border border-neutral-200 rounded-2xl p-5 mb-6 animate-in animate-in-delay-4">
          <div className="flex items-start gap-3 mb-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 text-black">
              <path d="M10 18L4 10H9V2L16 10H11L10 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <h3 className="text-black font-semibold mb-2">Fairness Insight</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Equal split: <span className="text-black font-mono font-semibold">{currencySymbol}{Math.round(equalSplit)}</span> per room. Fair split adjusts by up to <span className="text-black font-mono font-semibold">{currencySymbol}{Math.round(maxDifference)}</span> based on room features.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={shareResults}
            className="border border-neutral-200 text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-50 active:scale-[0.98] transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 12v5a1 1 0 001 1h10a1 1 0 001-1v-5M14 7l-4-4m0 0L6 7m4-4v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Share
          </button>
          <button
            onClick={() => {
              setScreen('welcome')
              setActiveRoom(0)
            }}
            className="bg-black text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-[0.98] transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M8 14l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            New Split
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
