"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Layers,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Plus,
  ShieldCheck,
  Sparkles,
  Tag,
  User,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

const STUDIO_CATEGORY_OPTIONS = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
] as const;

const PRESET_AMENITIES = [
  "28ft Cyclorama Wall",
  "Profoto Strobe Lighting Kit",
  "NC-20 Acoustic Isolation",
  "3-Phase Camlock Power",
  "Shure SM7dB Vocal Chain",
  "Dolby Atmos 7.1.4 Monitoring",
  "10Gbps Fiber Internet",
  "Hair & Makeup Vanity",
  "Private Client Green Room",
  "Drive-In Loading Dock",
  "Motorized Lighting Grid",
  "Full Prep Kitchen & Espresso Bar",
] as const;

interface AddStudioFormProps {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function AddStudioForm({ user, token }: AddStudioFormProps) {
  const router = useRouter();

  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState<string>("Photo Studio");
  const [hourlyRate, setHourlyRate] = React.useState("");
  const [securityDeposit, setSecurityDeposit] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  const [sqft, setSqft] = React.useState("1800");
  const [location, setLocation] = React.useState("");
  const [image, setImage] = React.useState("");
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([
    "10Gbps Fiber Internet",
    "Private Client Green Room",
  ]);
  const [customAmenity, setCustomAmenity] = React.useState("");
  const [overview, setOverview] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [invalidFields, setInvalidFields] = React.useState<
    Record<string, boolean>
  >({});

  const syncFieldValidity = (
    e: React.SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.currentTarget;
    if (!target.name) return;
    setInvalidFields((prev) => ({
      ...prev,
      [target.name]: !target.validity.valid,
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleAddCustomAmenity = () => {
    const trimmed = customAmenity.trim();
    if (!trimmed) return;
    if (!selectedAmenities.includes(trimmed)) {
      setSelectedAmenities((prev) => [...prev, trimmed]);
    }
    setCustomAmenity("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (
      !title.trim() ||
      !category.trim() ||
      !hourlyRate ||
      securityDeposit === "" ||
      !capacity ||
      !location.trim() ||
      !image.trim() ||
      !overview.trim()
    ) {
      const msg =
        "Please complete all required fields before publishing your studio.";
      setFormError(msg);
      toast.add({
        title: "Missing Required Fields",
        description: msg,
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/add-studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          category,
          hourlyRate: Number(hourlyRate),
          securityDeposit: Number(securityDeposit),
          capacity: Number(capacity),
          sqft: Number(sqft) || 1500,
          location: location.trim(),
          image: image.trim(),
          amenities: selectedAmenities,
          overview: overview.trim(),
          hostName: user.name,
          hostEmail: user.email,
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg =
          data?.error || data?.msg || "Failed to save studio listing.";
        setFormError(msg);
        toast.add({
          title: "Submission Failed",
          description: msg,
          type: "error",
        });
        return;
      }

      toast.add({
        title: "Studio Listed Successfully!",
        description: `"${title.trim()}" has been saved to the studios collection.`,
        type: "success",
      });

      router.push("/my-listings");
      router.refresh();
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while saving your studio.";
      setFormError(msg);
      toast.add({
        title: "Error Saving Studio",
        description: msg,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Main Studio Listing Form */}
      <Card className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:col-span-8">
        <CardHeader className="space-y-2 px-0 pt-0 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="h-7 rounded-full px-3 text-xs font-semibold text-primary"
            >
              <Sparkles className="mr-1.5 size-3.5" />
              Host Onboarding &amp; Space Publishing
            </Badge>
          </div>
          <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Add New Production Studio
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-muted-foreground">
            Provide accurate specifications, hourly pricing, and equipment
            amenities so creators can book your space with confidence.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0 pb-0">
          {formError && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
            >
              <AlertCircle
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              <div className="space-y-0.5">
                <p className="font-semibold">Unable to Publish Studio</p>
                <p className="text-xs leading-relaxed opacity-90">
                  {formError}
                </p>
              </div>
            </div>
          )}

          <form
            method="POST"
            action="/api/studios"
            onSubmit={handleSubmit}
            className="space-y-8"
            noValidate
          >
            {/* Section 1: Studio Identity & Category */}
            <fieldset className="space-y-5">
              <legend className="font-heading text-base font-bold text-foreground">
                1. Studio Identity &amp; Classification
              </legend>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Title */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label
                    htmlFor="studio-title"
                    className="text-sm font-medium text-foreground"
                  >
                    Studio Title <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Building2
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="studio-title"
                      name="title"
                      type="text"
                      required
                      aria-invalid={invalidFields.title ? "true" : undefined}
                      placeholder="e.g., Aperture 09 Daylight & Seamless Cyc Loft"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (invalidFields.title) syncFieldValidity(e);
                      }}
                      onBlur={syncFieldValidity}
                      className="h-11 rounded-lg pl-10 text-sm"
                    />
                  </div>
                </div>

                {/* Category Select */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="studio-category"
                    className="text-sm font-medium text-foreground"
                  >
                    Studio Category <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Layers
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <select
                      id="studio-category"
                      name="category"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      onBlur={syncFieldValidity}
                      className="flex h-11 w-full rounded-lg border border-input bg-transparent pr-4 pl-10 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                    >
                      {STUDIO_CATEGORY_OPTIONS.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="bg-popover text-popover-foreground"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location / Address */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="studio-location"
                    className="text-sm font-medium text-foreground"
                  >
                    Location / Address{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="studio-location"
                      name="location"
                      type="text"
                      required
                      autoComplete="street-address"
                      aria-invalid={invalidFields.location ? "true" : undefined}
                      placeholder="e.g., 450 Broadway, SoHo, New York, NY"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        if (invalidFields.location) syncFieldValidity(e);
                      }}
                      onBlur={syncFieldValidity}
                      className="h-11 rounded-lg pl-10 text-sm"
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Section 2: Pricing & Capacity */}
            <fieldset className="space-y-5 border-t border-border pt-6">
              <legend className="font-heading text-base font-bold text-foreground">
                2. Rates, Deposit &amp; Crew Capacity
              </legend>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {/* Hourly Rate ($) */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="studio-hourly-rate"
                    className="text-sm font-medium text-foreground"
                  >
                    Hourly Rate ($) <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <DollarSign
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="studio-hourly-rate"
                      name="hourlyRate"
                      type="number"
                      min={1}
                      step="1"
                      required
                      aria-invalid={
                        invalidFields.hourlyRate ? "true" : undefined
                      }
                      placeholder="95"
                      value={hourlyRate}
                      onChange={(e) => {
                        setHourlyRate(e.target.value);
                        if (invalidFields.hourlyRate) syncFieldValidity(e);
                      }}
                      onBlur={syncFieldValidity}
                      className="h-11 rounded-lg pl-10 text-sm"
                    />
                  </div>
                </div>

                {/* Security Deposit ($) */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="studio-security-deposit"
                    className="text-sm font-medium text-foreground"
                  >
                    Security Deposit ($){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <DollarSign
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="studio-security-deposit"
                      name="securityDeposit"
                      type="number"
                      min={0}
                      step="1"
                      required
                      aria-invalid={
                        invalidFields.securityDeposit ? "true" : undefined
                      }
                      placeholder="250"
                      value={securityDeposit}
                      onChange={(e) => {
                        setSecurityDeposit(e.target.value);
                        if (invalidFields.securityDeposit) syncFieldValidity(e);
                      }}
                      onBlur={syncFieldValidity}
                      className="h-11 rounded-lg pl-10 text-sm"
                    />
                  </div>
                </div>

                {/* Max Capacity */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="studio-capacity"
                    className="text-sm font-medium text-foreground"
                  >
                    Max Capacity (Crew){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Users
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="studio-capacity"
                      name="capacity"
                      type="number"
                      min={1}
                      step="1"
                      required
                      aria-invalid={invalidFields.capacity ? "true" : undefined}
                      placeholder="25"
                      value={capacity}
                      onChange={(e) => {
                        setCapacity(e.target.value);
                        if (invalidFields.capacity) syncFieldValidity(e);
                      }}
                      onBlur={syncFieldValidity}
                      className="h-11 rounded-lg pl-10 text-sm"
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Section 3: Studio Visuals & Amenities (Tags / Checkboxes) */}
            <fieldset className="space-y-5 border-t border-border pt-6">
              <legend className="font-heading text-base font-bold text-foreground">
                3. Studio Image &amp; Amenities List
              </legend>

              {/* Image URL */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="studio-image"
                  className="text-sm font-medium text-foreground"
                >
                  Studio Image URL <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <ImageIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="studio-image"
                    name="image"
                    type="url"
                    required
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    aria-invalid={invalidFields.image ? "true" : undefined}
                    placeholder="https://images.unsplash.com/photo-1526040652367-ac003a0475fe?auto=format&fit=crop&w=1200&q=85"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      if (invalidFields.image) syncFieldValidity(e);
                    }}
                    onBlur={syncFieldValidity}
                    className="h-11 rounded-lg pl-10 text-sm"
                  />
                </div>
              </div>

              {/* Amenities Checkboxes & Custom Tags */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">
                  Amenities &amp; Production Gear (Select Checkboxes or Add
                  Tags)
                </Label>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                  {PRESET_AMENITIES.map((amenity) => {
                    const checked = selectedAmenities.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition-colors select-none ${
                          checked
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-background text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="amenities"
                          value={amenity}
                          checked={checked}
                          onChange={() => toggleAmenity(amenity)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`flex size-4 shrink-0 items-center justify-center rounded border transition-colors ${
                            checked
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input bg-background"
                          }`}
                        >
                          {checked && <Check className="size-3" />}
                        </span>
                        <span className="truncate">{amenity}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Add Custom Amenity Tag */}
                <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                  <div className="relative flex-1">
                    <Tag
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="custom-amenity-input"
                      name="customAmenity"
                      type="text"
                      placeholder="Add a custom gear or amenity tag (e.g., Red V-Raptor Package)"
                      value={customAmenity}
                      onChange={(e) => setCustomAmenity(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomAmenity();
                        }
                      }}
                      className="h-10 rounded-lg pl-10 text-sm"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCustomAmenity}
                    className="h-10 shrink-0 rounded-lg px-4 text-xs font-semibold"
                  >
                    <Plus className="mr-1.5 size-3.5" />
                    Add Tag
                  </Button>
                </div>

                {/* Selected Amenity Tags Display */}
                {selectedAmenities.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {selectedAmenities.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => toggleAmenity(item)}
                          aria-label={`Remove ${item}`}
                          className="rounded-full p-0.5 text-muted-foreground hover:bg-primary/20 hover:text-foreground"
                        >
                          <X className="size-3" aria-hidden="true" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </fieldset>

            {/* Section 4: Detailed Overview */}
            <fieldset className="space-y-4 border-t border-border pt-6">
              <legend className="font-heading text-base font-bold text-foreground">
                4. Detailed Studio Overview
              </legend>

              <div className="space-y-1.5">
                <Label
                  htmlFor="studio-overview"
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                >
                  <FileText className="size-4 text-primary" aria-hidden="true" />
                  Detailed Overview <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="studio-overview"
                  name="overview"
                  rows={5}
                  required
                  aria-invalid={invalidFields.overview ? "true" : undefined}
                  placeholder="Describe ceiling heights, acoustic treatment, natural daylight exposure, lighting grid load limits, parking, and house rules..."
                  value={overview}
                  onChange={(e) => {
                    setOverview(e.target.value);
                    if (invalidFields.overview) syncFieldValidity(e);
                  }}
                  onBlur={syncFieldValidity}
                  className="rounded-xl p-3.5 text-sm leading-relaxed"
                />
              </div>
            </fieldset>

            {/* Section 5: Read-Only Host Credentials */}
            <fieldset className="space-y-4 border-t border-border pt-6">
              <legend className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
                <span>5. Verified Host Credentials</span>
                <Badge
                  variant="outline"
                  className="rounded-full border-primary/30 bg-primary/5 px-2.5 py-0.5 text-[11px] font-semibold text-primary"
                >
                  <Lock className="mr-1 size-3" />
                  Read-Only
                </Badge>
              </legend>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="host-name"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Host Name (Read-Only)
                  </Label>
                  <div className="relative">
                    <User
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="host-name"
                      name="hostName"
                      type="text"
                      readOnly
                      value={user.name}
                      className="h-11 cursor-not-allowed rounded-lg bg-muted/60 pl-10 text-sm text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="host-email"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Host Email (Read-Only)
                  </Label>
                  <div className="relative">
                    <Mail
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="host-email"
                      name="hostEmail"
                      type="email"
                      readOnly
                      value={user.email}
                      className="h-11 cursor-not-allowed rounded-lg bg-muted/60 pl-10 text-sm text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Submit Button */}
            <div className="flex flex-col items-center justify-end gap-3 border-t border-border pt-6 sm:flex-row">
              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
                className="h-11 w-full rounded-lg px-8 text-sm font-semibold shadow-sm sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Publishing Studio...
                  </>
                ) : (
                  <>
                    Publish Studio Space
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Right Column: Live Card Preview & Host Guarantee */}
      <div className="space-y-6 lg:col-span-4">
        <div className="sticky top-28 space-y-6">
          <Card className="overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xs">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <img
                src={
                  image.trim() ||
                  "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?auto=format&fit=crop&w=900&q=80"
                }
                alt={title || "Studio Live Preview"}
                loading="lazy"
                width={640}
                height={400}
                className="size-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25"
              />
              <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between">
                <Badge className="h-6 rounded-full bg-background/95 px-3 text-xs font-semibold text-foreground">
                  {category || "Photo Studio"}
                </Badge>
                <span className="rounded-full bg-black/75 px-2.5 py-1 text-xs font-semibold text-white">
                  Live Preview
                </span>
              </div>
              <div className="absolute right-3.5 bottom-3.5 rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                ${hourlyRate || "0"} / hr
              </div>
            </div>

            <CardHeader className="space-y-1.5 px-5 pt-5 pb-2">
              <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MapPin className="size-3.5 shrink-0 text-primary" />
                <span className="truncate">
                  {location || "Studio Location / Address"}
                </span>
              </p>
              <CardTitle className="line-clamp-2 font-heading text-lg font-bold text-foreground">
                {title || "Your Studio Title"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 px-5 pb-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Deposit: ${securityDeposit || "0"}</span>
                <span>Max Crew: {capacity || "0"}</span>
              </div>
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {overview ||
                  "Your studio overview will appear here so creators can review your space specifications before booking."}
              </p>
            </CardContent>
          </Card>

          <div className="rounded-2xl border border-border bg-muted/40 p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <ShieldCheck className="size-4" />
              <span>$2M Host Liability Protection</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Every studio listed under <strong>{user.email}</strong> is
              automatically covered by StudioSpace&apos;s $2M Host Liability
              Guarantee and $250K equipment escrow protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
