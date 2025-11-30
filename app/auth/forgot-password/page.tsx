"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Reset email sent to:", email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Check Your Email</h1>
          <p className="mt-2 text-sm text-muted-foreground">We've sent a password reset link to {email}</p>
        </div>

        <div className="rounded-lg border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            Follow the link in the email to reset your password. If you don't see it, check your spam folder.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Didn't receive the email?</p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full rounded-lg bg-muted px-4 py-2 font-medium text-foreground hover:bg-muted/80 transition"
          >
            Try Another Email
          </button>
        </div>

        <Link href="/auth/login" className="flex items-center justify-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Log In
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90 transition"
        >
          Send Reset Link
        </button>
      </form>

      <Link href="/auth/login" className="flex items-center justify-center gap-2 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Log In
      </Link>
    </div>
  )
}
