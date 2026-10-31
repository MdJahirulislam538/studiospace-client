"use client";

import * as React from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import {
  AlertCircle,
  Aperture,
  ArrowRight,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
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

function validatePasswordCriteria(password: string) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const isValid = hasUppercase && hasLowercase && hasMinLength;

  const missing: string[] = [];
  if (!hasUppercase) missing.push("at least one uppercase letter (A-Z)");
  if (!hasLowercase) missing.push("at least one lowercase letter (a-z)");
  if (!hasMinLength) missing.push("at least 6 characters");

  const errorMessage = isValid
    ? null
    : `Password must contain ${missing.join(", ")}.`;

  return {
    hasUppercase,
    hasLowercase,
    hasMinLength,
    isValid,
    errorMessage,
  };
}

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [fieldInvalid, setFieldInvalid] = React.useState<{
    name?: boolean;
    email?: boolean;
    photoUrl?: boolean;
    password?: boolean;
  }>({});

  const passwordChecks = React.useMemo(
    () => validatePasswordCriteria(password),
    [password]
  );

  const syncFieldValidity = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const fieldName = input.name as "name" | "email" | "photoUrl" | "password";

    if (fieldName === "password") {
      const check = validatePasswordCriteria(input.value);
      setFieldInvalid((prev) => ({ ...prev, password: !check.isValid }));
      setPasswordError(check.errorMessage);
      return;
    }

    const isInvalid = !input.validity.valid;
    setFieldInvalid((prev) => ({ ...prev, [fieldName]: isInvalid }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      photoUrl: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.photoUrl || undefined,
    });

    if (data) {
      router.push("/login");
    }

    if (error) {
      console.log(error);
      setFormError(error.message || "Registration failed.");
      toast.add({
        title: "Registration Failed",
        description: error.message || "Registration failed.",
        type: "error",
      });
    }
  };

  const handleGoogleAuth = async () => {
    setFormError(null);
    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        const msg =
          error.message ||
          "Google authentication could not be completed. Please try again.";
        setFormError(msg);
        toast.add({
          title: "Google Sign-In Failed",
          description: msg,
          type: "error",
        });
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to authenticate with Google.";
      setFormError(msg);
      toast.add({
        title: "Google Authentication Error",
        description: msg,
        type: "error",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const initials = name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card shadow-lg lg:grid-cols-12">
        {/* Left Editorial Studio Showcase Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-foreground p-10 text-background lg:col-span-5 lg:flex">
          <img
            src="https://images.unsplash.com/photo-1526040652367-ac003a0475fe?auto=format&fit=crop&w=1000&q=80"
            alt="Daylight photography studio loft on StudioSpace"
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
                Join the Creator Network
              </Badge>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Book Verified Studios or Monetize Your Creative Space
              </h2>
              <p className="text-sm leading-relaxed text-white/80">
                Create a single StudioSpace account to reserve hourly shoot
                slots across photography lofts, cinema sound stages, podcast
                rooms, and music suites—or list your own studio.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-3 rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <ShieldCheck className="size-4" />
              <span>Verified Creator &amp; Host Protection</span>
            </div>
            <p className="text-xs leading-relaxed text-white/80">
              Transparent hourly rates, instant slot booking, and $2M commercial
              liability protection on every production.
            </p>
          </div>
        </div>

        {/* Right Registration Form Panel */}
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
                Create Your StudioSpace Account
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Register below with your details or sign in instantly with
                Google.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-0">
              {/* Inline Form Error Alert */}
              {formError && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive"
                >
                  <AlertCircle
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="space-y-0.5">
                    <p className="font-semibold">Registration Error</p>
                    <p className="text-xs leading-relaxed opacity-90">
                      {formError}
                    </p>
                  </div>
                </div>
              )}

              {/* Social Login Button (Google -> Navigates to Home page) */}
              <Button
                type="button"
                variant="outline"
                disabled={isGoogleLoading || isSubmitting}
                onClick={handleGoogleAuth}
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
                  Or register with email
                </span>
                <div className="w-full border-t border-border" />
              </div>

              {/* Registration Form */}
              <form
                method="POST"
                action="/api/auth/sign-up/email"
                onSubmit={handleRegister}
                className="space-y-4"
                noValidate
              >
                {/* 1. Name Field */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="register-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="register-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      aria-invalid={fieldInvalid.name ? "true" : undefined}
                      placeholder="Aria Vance"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (fieldInvalid.name) syncFieldValidity(e);
                      }}
                      onBlur={syncFieldValidity}
                      className="h-11 rounded-lg pl-10 text-sm"
                    />
                  </div>
                </div>

                {/* 2. Email Field */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="register-email"
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
                      id="register-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      aria-invalid={fieldInvalid.email ? "true" : undefined}
                      placeholder="creator@studiospace.io"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldInvalid.email) syncFieldValidity(e);
                      }}
                      onBlur={syncFieldValidity}
                      className="h-11 rounded-lg pl-10 text-sm"
                    />
                  </div>
                </div>

                {/* 3. Photo URL Field with Live Avatar Preview */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="register-photo-url"
                    className="text-sm font-medium text-foreground"
                  >
                    Photo URL
                  </Label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <ImageIcon
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        id="register-photo-url"
                        name="photoUrl"
                        type="url"
                        autoComplete="url"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        aria-invalid={fieldInvalid.photoUrl ? "true" : undefined}
                        placeholder="https://images.unsplash.com/photo-..."
                        value={photoUrl}
                        onChange={(e) => {
                          setPhotoUrl(e.target.value);
                          if (fieldInvalid.photoUrl) syncFieldValidity(e);
                        }}
                        onBlur={syncFieldValidity}
                        className="h-11 rounded-lg pl-10 text-sm"
                      />
                    </div>
                    <Avatar className="size-11 shrink-0 ring-1 ring-border">
                      <AvatarImage
                        src={photoUrl.trim() || undefined}
                        alt={name || "Profile preview"}
                      />
                      <AvatarFallback className="text-xs font-semibold">
                        {initials || "SS"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* 4. Password Field with Validation Checklist & Inline Error */}
                <div className="space-y-2">
                  <Label
                    htmlFor="register-password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="register-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      aria-describedby="password-requirements password-error"
                      aria-invalid={fieldInvalid.password ? "true" : undefined}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldInvalid.password || passwordError) {
                          syncFieldValidity(e);
                        }
                      }}
                      onBlur={syncFieldValidity}
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

                  {/* Inline Password Error Message inside the form */}
                  {passwordError && (
                    <p
                      id="password-error"
                      role="alert"
                      aria-live="polite"
                      className="flex items-center gap-1.5 text-xs font-medium text-destructive"
                    >
                      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                      <span>{passwordError}</span>
                    </p>
                  )}

                  {/* Password Criteria Checklist */}
                  <ul
                    id="password-requirements"
                    className="grid grid-cols-1 gap-1.5 rounded-xl border border-border bg-muted/40 p-3 text-xs sm:grid-cols-3"
                  >
                    <li
                      className={`flex items-center gap-1.5 font-medium ${
                        passwordChecks.hasUppercase
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {passwordChecks.hasUppercase ? (
                        <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <Circle className="size-3.5 shrink-0" aria-hidden="true" />
                      )}
                      <span>Uppercase letter (A-Z)</span>
                    </li>
                    <li
                      className={`flex items-center gap-1.5 font-medium ${
                        passwordChecks.hasLowercase
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {passwordChecks.hasLowercase ? (
                        <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <Circle className="size-3.5 shrink-0" aria-hidden="true" />
                      )}
                      <span>Lowercase letter (a-z)</span>
                    </li>
                    <li
                      className={`flex items-center gap-1.5 font-medium ${
                        passwordChecks.hasMinLength
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {passwordChecks.hasMinLength ? (
                        <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <Circle className="size-3.5 shrink-0" aria-hidden="true" />
                      )}
                      <span>At least 6 characters</span>
                    </li>
                  </ul>
                </div>

                {/* 5. Register Submit Button */}
                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubmitting || isGoogleLoading}
                  className="mt-2 h-11 w-full rounded-lg px-6 text-sm font-semibold shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Register
                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            {/* Link for Login */}
            <CardFooter className="mt-2 flex items-center justify-center border-t border-border bg-transparent px-0 pt-6 pb-0">
              <p className="text-sm text-muted-foreground">
                Already have a StudioSpace account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}