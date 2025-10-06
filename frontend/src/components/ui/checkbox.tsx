"use client"

import React, { useState } from "react"

// Simple Check icon component to avoid external dependency
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
)

interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
  className?: string
  name?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked: controlledChecked, onCheckedChange, disabled, id, className, name, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(false)

    const checked = controlledChecked !== undefined ? controlledChecked : internalChecked

    const handleChange = () => {
      if (disabled) return

      const newChecked = !checked
      if (onCheckedChange) {
        onCheckedChange(newChecked)
      } else {
        setInternalChecked(newChecked)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        handleChange()
      }
    }

    let checkboxClasses =
      "h-4 w-4 shrink-0 rounded-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition-colors flex items-center justify-center"

    if (checked) {
      checkboxClasses += " bg-blue-600 border-blue-600 text-white"
    }

    if (disabled) {
      checkboxClasses += " cursor-not-allowed opacity-50"
    }

    if (className) {
      checkboxClasses += ` ${className}`
    }

    return (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          id={id}
          name={name}
          className="sr-only"
          {...props}
        />
        <div
          onClick={handleChange}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="checkbox"
          aria-checked={checked}
          aria-disabled={disabled}
          className={checkboxClasses}
        >
          {checked && <CheckIcon className="h-3 w-3 text-white" />}
        </div>
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
