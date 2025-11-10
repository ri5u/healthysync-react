
"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card } from "./ui/card"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../lib/auth"
import { Header } from "./header"
import { Footer } from "./footer"

export function Login() {
 	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [remember, setRemember] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const auth = useAuth()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		if (!email.trim() || !password.trim()) {
			setError("Please provide both email and password.")
			return
		}
		setLoading(true)

		try {
			await auth.login(email.trim(), password, remember)
			navigate('/dashboard')
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : String(err)
			setError(msg || 'Sign in failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className="min-h-screen bg-background">
			<Header />

			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
					<div className="hidden md:block">
						{/* Small marketing/hero beside the login form to keep theme consistent */}
						<div className="space-y-6">
							<h1 className="text-3xl font-bold text-foreground">Sign in to HealthSync</h1>
							<p className="text-sm text-muted-foreground">Secure access to clinical workflows, patient records, and interoperability tools.</p>
							<ul className="mt-4 space-y-2 text-sm text-muted-foreground">
								<li>• HIPAA-ready access controls</li>
								<li>• Fast FHIR-enabled integrations</li>
								<li>• Centralized clinical data</li>
							</ul>
						</div>
					</div>

					<div>
						<Card className="max-w-md md:max-w-lg lg:max-w-xl w-full mx-auto p-6">
							<h2 className="text-2xl font-semibold text-foreground mb-2">Welcome back</h2>
							<p className="text-sm text-muted-foreground mb-4">Sign in to continue to HealthSync EMR</p>

							<form onSubmit={handleSubmit} className="space-y-4">
								{error && <div className="text-sm text-destructive">{error}</div>}

								<div>
									<label className="text-sm text-muted-foreground block mb-1">Email</label>
									<Input
										type="email"
										placeholder="you@clinic.org"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>

								<div>
									<div className="flex items-center justify-between mb-1">
										<label className="text-sm text-muted-foreground">Password</label>
										<Link to="/forgot" className="text-sm text-primary underline-offset-2 hover:underline">
											Forgot?
										</Link>
									</div>
									<Input
										type="password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>

								<div className="flex items-center justify-between">
									<label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
										<input
											type="checkbox"
											checked={remember}
											onChange={(e) => setRemember(e.target.checked)}
											className="w-4 h-4 rounded border border-input bg-background"
										/>
										Remember me
									</label>
								</div>

								<div>
									<Button type="submit" className="w-full" disabled={loading}>
										{loading ? "Signing in…" : "Sign in"}
									</Button>
								</div>

								<div className="text-center text-sm text-muted-foreground">
									Don’t have an account?{' '}
									<Link to="/signup" className="text-primary hover:underline">
										Get started
									</Link>
								</div>
							</form>
							</Card>
						</div>
					</div>
				</div>

				<Footer />
			</main>
	)
}

export default Login
