import { Input } from "./input"
import { useState } from "react"
import { X } from "lucide-react"

type KeywordsInputProps = {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export const KeywordsInput = ({ 
  value, 
  onChange, 
  placeholder = "Enter Keyword & Press Enter" 
}: KeywordsInputProps) => {
  const [input, setInput] = useState("")

  const addKeyword = (word: string) => {
    const trimmed = word.trim()
    if (!trimmed) return
    if (value.includes(trimmed)) return

    onChange([...value, trimmed])
    setInput("")
  }

  const removeKeyword = (word: string) => {
    onChange(value.filter(k => k !== word))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addKeyword(input)
    }

    if (e.key === "Backspace" && !input && value.length) {
      onChange(value.slice(0, -1))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow alphabets and spaces
    const filtered = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    setInput(filtered)
  }

  return (
    <div className="relative">
      <Input
        type="text"
        className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={value.length === 0 ? placeholder : ""}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {value.map(word => (
            <span
              key={word}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
            >
              {word}
              <button
                type="button"
                onClick={() => removeKeyword(word)}
                className="inline-flex items-center justify-center hover:bg-gray-200 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
