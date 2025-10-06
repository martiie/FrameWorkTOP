"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface AlertDialogContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined)

const useAlertDialog = () => {
  const context = useContext(AlertDialogContext)
  if (!context) {
    throw new Error("useAlertDialog must be used within AlertDialog")
  }
  return context
}

interface AlertDialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const AlertDialog = ({ children, open: controlledOpen, onOpenChange }: AlertDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false)

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen)
    } else {
      setInternalOpen(newOpen)
    }
  }

  return <AlertDialogContext.Provider value={{ open, setOpen }}>{children}</AlertDialogContext.Provider>
}

interface AlertDialogTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  className?: string
  onClick?: () => void
}

const AlertDialogTrigger = ({ children, asChild, className, onClick }: AlertDialogTriggerProps) => {
  const { setOpen } = useAlertDialog()

  const handleClick = () => {
    setOpen(true)
    onClick?.()
  }

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as any
    return React.cloneElement(children as React.ReactElement<any>, {
      ...childProps,
      onClick: handleClick,
      className: `${childProps.className || ""} ${className || ""}`.trim(),
    })
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}

interface AlertDialogContentProps {
  children: React.ReactNode
  className?: string
}

const AlertDialogContent = ({ children, className }: AlertDialogContentProps) => {
  const { open, setOpen } = useAlertDialog()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, setOpen])

  if (!open) return null

  const baseClasses =
    "relative z-50 grid w-full max-w-lg gap-4 border bg-white p-6 shadow-lg animate-in fade-in-0 zoom-in-95 rounded-lg"
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 animate-in fade-in-0" onClick={() => setOpen(false)} />

      {/* Content */}
      <div className={finalClasses} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  )
}

const AlertDialogHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const baseClasses = "flex flex-col space-y-2 text-center sm:text-left"
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses
  return <div className={finalClasses}>{children}</div>
}

const AlertDialogFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const baseClasses = "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses
  return <div className={finalClasses}>{children}</div>
}

const AlertDialogTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const baseClasses = "text-lg font-semibold"
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses
  return <h2 className={finalClasses}>{children}</h2>
}

const AlertDialogDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const baseClasses = "text-sm text-gray-500"
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses
  return <p className={finalClasses}>{children}</p>
}

interface AlertDialogActionProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const AlertDialogAction = ({ children, className, onClick }: AlertDialogActionProps) => {
  const { setOpen } = useAlertDialog()

  const handleClick = () => {
    onClick?.()
    setOpen(false)
  }

  const baseClasses =
    "inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses

  return (
    <button onClick={handleClick} className={finalClasses}>
      {children}
    </button>
  )
}

const AlertDialogCancel = ({ children, className, onClick }: AlertDialogActionProps) => {
  const { setOpen } = useAlertDialog()

  const handleClick = () => {
    onClick?.()
    setOpen(false)
  }

  const baseClasses =
    "inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2 sm:mt-0"
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses

  return (
    <button onClick={handleClick} className={finalClasses}>
      {children}
    </button>
  )
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
