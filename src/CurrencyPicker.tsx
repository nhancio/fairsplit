import { useState, useRef, useEffect } from 'react'
import { currencies, type CurrencyInfo } from './currencies'

interface CurrencyPickerProps {
  value: string
  onChange: (code: string) => void
}

export default function CurrencyPicker({ value, onChange }: CurrencyPickerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selected = currencies.find(c => c.code === value)

  const filtered = currencies.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border border-neutral-200 py-4 px-5 rounded-xl hover:bg-neutral-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-black">{selected?.symbol}</span>
          <div className="text-left">
            <div className="text-black font-semibold">{selected?.code}</div>
            <div className="text-neutral-400 text-xs">{selected?.name}</div>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 bottom-full left-0 right-0 mb-2 bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-3 border-b border-neutral-100">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search currency..."
              className="w-full border border-neutral-200 text-black placeholder-neutral-300 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filtered.length === 0 && (
              <div className="px-5 py-4 text-neutral-400 text-sm text-center">No currencies found</div>
            )}
            {filtered.map((c: CurrencyInfo) => (
              <button
                key={c.code}
                onClick={() => {
                  onChange(c.code)
                  setOpen(false)
                  setSearch('')
                }}
                className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                  c.code === value
                    ? 'bg-neutral-100'
                    : 'hover:bg-neutral-50'
                }`}
              >
                <span className="text-lg font-bold text-black w-10">{c.symbol}</span>
                <div>
                  <span className="text-black font-medium text-sm">{c.code}</span>
                  <span className="text-neutral-400 text-xs ml-2">{c.name}</span>
                </div>
                {c.code === value && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-auto text-black">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
