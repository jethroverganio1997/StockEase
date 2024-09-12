'use client';
import React from 'react'

interface AlertScreenProp{
  error: Error & { digest?: string }
  reset?: () => void
  type?: "Info" | "Error" | "Warning" | "Success"
}

export default function AlertScreen({
    error,
    reset,
    type = "Error",
  }: AlertScreenProp) { 
  if (type === "Error")
  return (
    <div className="flex h-60 items-center justify-center space-x-2">
        <div className="flex items-start justify-center space-x-2">
          <span className="text-md font-semibold">{error.name} :</span>
          <p className="max-w-md text-sm">
            {error.message}
          </p>
        </div>
      </div>
  )

  return (
    <div>
      {type}
    </div>
  )
}
