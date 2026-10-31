"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Aperture,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

function GoogleBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29a11.99 11.99 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
      />
    </svg>
  );
}

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo =
    searchParams.get("callbackUrl") || searchParams.get("redirect") || "/";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [resetFeedback, setResetFeedback] = React.useState<string | null>(null);
  const [emailInvalid, setEmailInvalid] = React.useState(false);
  const [passwordInvalid, setPasswordInvalid] = React.useState(false);

  const syncAriaInvalid = (e: React.FocusEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const isInvalid = !input.validity.valid;
    if (input.name === "email") {
      setEmailInvalid(isInvalid);
    } else if (input.name === "password") {
      setPasswordInvalid(isInvalid);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setResetFeedback(null);

    if (!email.trim() || !password) {
      const msg = "Please enter both your email address and password.";
      setErrorMessage(msg);
      toast.add({
        title: "Missing Credentials",
        description: msg,
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: redirectTo,
      });

      if (error) {
        const msg =
          error.message || "Invalid email or password. Please try again.";
        setErrorMessage(msg);
        toast.add({
          title: "Login Failed",
          description: msg,
          type: "error",
        });
        return;
      }

      toast.add({
        title: "Welcome back to StudioSpace!",
        description: "You have logged in successfully. Redirecting...",
        type: "success",
      });

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to sign in right now. Please check your credentials and try again.";
      setErrorMessage(msg);
      toast.add({
        title: "Authentication Error",
        description: msg,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setResetFeedback(null);
    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });

      if (error) {
        const msg =
          error.message ||
          "Google authentication could not be completed. Please try again.";
        setErrorMessage(msg);
        toast.add({
          title: "Google Login Failed",
          description: msg,
          type: "error",
        });
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to connect with Google authentication.";
      setErrorMessage(msg);
      toast.add({
        title: "Google Sign-In Error",
        description: msg,
        type: "error",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setErrorMessage(null);
    if (!email.trim()) {
      const msg =
        "Enter your account email address above first, then click Forgot Password to receive a reset link.";
      setErrorMessage(msg);
      toast.add({
        title: "Email Required",
        description: msg,
        type: "warning",
      });
      return;
    }

    const feedback = `If an account exists for ${email.trim()}, password reset instructions have been sent.`;
    setResetFeedback(feedback);
    toast.add({
      title: "Password Reset Requested",
      description: feedback,
      type: "info",
    });
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card shadow-lg lg:grid-cols-12">
        {/* Left Editorial Studio Showcase Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-foreground p-10 text-background lg:col-span-5 lg:flex">
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80"
            alt="Recording console inside a StudioSpace production suite"
            loading="lazy"
            width={800}
            height={1000}
            className="absolute inset-0 size-full object-cover opacity-35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/40"
          />

          <div className="relative z-10 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Aperture className="size-5.5" aria-hidden="true" />
              </span>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Studio<span className="text-primary">Space</span>
              </span>
            </Link>

            <div className="space-y-3 pt-4">
              <Badge className="h-7 rounded-full bg-primary/90 px-3 text-xs font-semibold text-primary-foreground">
                <Sparkles className="mr-1.5 size-3.5" />
                Creator &amp; Host Portal
              </Badge>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Access Your Production Bookings &amp; Studio Listings
              </h2>
              <p className="text-sm leading-relaxed text-white/80">
                Manage real-time studio calendars, download shoot call-sheets,
                and reserve verified photography cyc walls, cinema stages, and
                podcast suites.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-3 rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <ShieldCheck className="size-4" />
              <span>$2M Host &amp; Crew Liability Coverage</span>
            </div>
            <p className="text-xs leading-relaxed text-white/80">
              Every session booked through StudioSpace is backed by verified ID
              checks, escrow gear protection, and 24/7 production concierge
              support.
            </p>
          </div>
        </div>

        {/* Right Login Form Panel */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 lg:p-12">
          <Card className="border-0 bg-transparent p-0 shadow-none ring-0">
            <CardHeader className="space-y-2 px-0 pt-0 pb-6">
              <div className="flex items-center gap-2 lg:hidden">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Aperture className="size-4.5" aria-hidden="true" />
                </span>
                <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                  Studio<span className="text-primary">Space</span>
                </span>
              </div>
              <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Log in to Your Account
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Enter your email and password below or continue with Google to
                access your StudioSpace dashboard.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-0">
              {/* Inline Error Alert Banner inside the form */}
              {errorMessage && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <div className="space-y-0.5">
                    <p className="font-semibold">Authentication Error</p>
                    <p className="text-xs leading-relaxed opacity-90">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Forgot Password Feedback Banner */}
              {resetFeedback && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 p-3.5 text-sm text-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-xs leading-relaxed">{resetFeedback}</p>
                </div>
              )}

              {/* Social Login Button (Google Only) */}
              <Button
                type="button"
                variant="outline"
                disabled={isGoogleLoading || isSubmitting}
                onClick={handleGoogleLogin}
                className="h-11 w-full rounded-lg border-border bg-background px-5 text-sm font-semibold shadow-xs transition-all hover:bg-muted"
              >
                {isGoogleLoading ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <GoogleBrandIcon className="mr-2.5 size-4.5" />
                )}
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-border" />
                <span className="bg-card px-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Or continue with email
                </span>
                <div className="w-full border-t border-border" />
              </div>

              {/* Email & Password Login Form */}
              <form
                method="POST"
                action="/api/auth/sign-in/email"
                onSubmit={handleEmailLogin}
                className="space-y-4"
                noValidate
              >
                {/* Email Field */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      aria-invalid={emailInvalid ? "true" : undefined}
                      placeholder="creator@studiospace.io"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailInvalid) syncAriaInvalid(e);
                      }}
                      onBlur={syncAriaInvalid}
                      className="h-11 rounded-lg pl-10 text-sm"
                    />
                  </div>
                </div>

                {/* Password Field + Forgot Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="login-password"
                      className="text-sm font-medium text-foreground"
                    >
                      Password
                    </Label>
                    <span className="cursor-pointer text-xs font-semibold text-primary underline-offset-4 transition-colors hover:underline">
                      Forgot Password?
                    </span>
                  </div>

                  <div className="relative">
                    <Lock
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      aria-invalid={passwordInvalid ? "true" : undefined}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordInvalid) syncAriaInvalid(e);
                      }}
                      onBlur={syncAriaInvalid}
                      className="h-11 rounded-lg pr-10 pl-10 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Primary Login Submit Button */}
                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubmitting || isGoogleLoading}
                  className="mt-2 h-11 w-full rounded-lg px-6 text-sm font-semibold shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            {/* Register Link Footer */}
            <CardFooter className="mt-2 flex items-center justify-center border-t border-border bg-transparent px-0 pt-6 pb-0">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have a StudioSpace account?{" "}
                <Link
                  href={
                    redirectTo !== "/"
                      ? `/signup?callbackUrl=${encodeURIComponent(redirectTo)}`
                      : "/signup"
                  }
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      }
    >
      <LoginFormContent />
    </React.Suspense>
  );
}
