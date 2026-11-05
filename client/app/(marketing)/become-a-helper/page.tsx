"use client";

import { useRef, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import type { ConfirmationResult } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import type { FormEvent, ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  submitHelperApplication,
  uploadVerificationDocument,
} from "@/lib/api";

const serviceOptions = [
  "Maid Services",
  "Babysitting",
  "Nanny Care",
];

const availabilityOptions = [
  "Full-time",
  "Part-time",
  "Hourly",
  "Live-in",
];

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

type Verification = {
  id: string;
  type: string;
  status: string;
};

type SubmittedApplication = {
  id: string;
  status: string;
  verifications: Verification[];
};

const documentOptions = [
  {
    type: "IDENTITY",
    label: "Identity Document (Aadhaar)",
    documentType: "Identity Document",
  },
  {
    type: "ADDRESS",
    label: "Address Proof",
    documentType: "Address Proof",
  },
  {
    type: "BACKGROUND",
    label: "Background Verification Document",
    documentType: "Background Check Document",
  },
];

const MAX_FILE_SIZE = 4 * 1024 * 1024;

export default function BecomeAHelperPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [firebaseIdToken, setFirebaseIdToken] = useState<string | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [application, setApplication] =
    useState<SubmittedApplication | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingType, setUploadingType] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedFiles, setSelectedFiles] =
    useState<Record<string, File | null>>({});

  const [uploadMessages, setUploadMessages] =
    useState<Record<string, string>>({});
  
  async function handleSendOtp() {
    setErrorMessage("");
    setOtpMessage("");

    const normalizedPhone = phone.replace(/[\s()-]/g, "");

    if (!/^\+[1-9]\d{7,14}$/.test(normalizedPhone)) {
      setOtpMessage("Enter a valid phone number with its country code, e.g. +919876543210.");
      return;
    }

    try {
      setIsSendingOtp(true);

      if (!recaptchaVerifier.current) {
        recaptchaVerifier.current = new RecaptchaVerifier(
          firebaseAuth,
          "recaptcha-container",
          { size: "normal" },
        );
      }

      const result = await signInWithPhoneNumber(
        firebaseAuth,
        normalizedPhone,
        recaptchaVerifier.current,
      );

      setConfirmationResult(result);
      setPhoneVerified(false);
      setOtpMessage("OTP sent. Enter the verification code.");
    } catch (error) {
      recaptchaVerifier.current?.clear();
      recaptchaVerifier.current = null;

      setOtpMessage(
        error instanceof Error ? error.message : "Unable to send OTP.",
      );
    } finally {
      setIsSendingOtp(false);
    }
  }

  async function handleVerifyOtp() {
    if (!confirmationResult) {
      setOtpMessage("Please request an OTP first.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setOtpMessage("Enter the six-digit OTP.");
      return;
    }

    try {
      setIsVerifyingOtp(true);
      setOtpMessage("");

      const result = await confirmationResult.confirm(otp);

      const idToken = await result.user.getIdToken();

      setFirebaseIdToken(idToken);
      setPhoneVerified(true);
      setOtpMessage("Phone number verified successfully.");
    } catch {
      setPhoneVerified(false);
      setOtpMessage("Invalid or expired OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  }

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!isLoaded) {
      setErrorMessage("Please wait while your account is loading.");
      return;
    }

    if (!isSignedIn) {
      setErrorMessage("Please sign in before submitting your application.");
      return;
    }

    if (!phoneVerified || !firebaseIdToken) {
      setErrorMessage(
        "Please verify your phone number using OTP before continuing.",
      );
      return;
    }

    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one service.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      phone: phone.replace(/[\s()-]/g, ""),
      city: String(formData.get("city") ?? "").trim(),
      area: String(formData.get("area") ?? "").trim(),
      services: selectedServices,
      experience: String(formData.get("experience") ?? ""),
      availability: String(formData.get("availability") ?? ""),
      experienceDetails: String(
        formData.get("experienceDetails") ?? "",
      ).trim(),
    };

    setIsSubmitting(true);

    try {
      const response = await submitHelperApplication(
        getToken,
        payload,
        firebaseIdToken,
      );

      if (response.status < 200 || response.status >= 300) {
        setErrorMessage(
          response.data?.message ??
            "We couldn't submit your application. Please try again.",
        );
        return;
      }

      const createdApplication = response.data
        ?.application as SubmittedApplication | undefined;

      if (
        !createdApplication?.id ||
        !Array.isArray(createdApplication.verifications)
      ) {
        setErrorMessage(
          "Your application may have been submitted, but verification details could not be loaded. Please contact support before submitting again.",
        );
        return;
      }

      setApplication(createdApplication);
      setSelectedFiles({});
      setUploadMessages({});
      setSelectedServices([]);

      // Step 2 appears automatically after successful submission.
      // Start it from the top, since the submit button sits at the bottom of step 1.
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDocumentUpload(
    type: string,
    documentType: string,
  ) {
    if (!application) {
      setUploadMessages((current) => ({
        ...current,
        [type]: "Application details are unavailable. Please refresh the page.",
      }));
      return;
    }

    const verification = application.verifications.find(
      (item) => item.type === type,
    );

    const file = selectedFiles[type];

    if (!verification) {
      setUploadMessages((current) => ({
        ...current,
        [type]: "The verification record could not be found.",
      }));
      return;
    }

    if (!file) {
      setUploadMessages((current) => ({
        ...current,
        [type]: "Please choose a document first.",
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadMessages((current) => ({
        ...current,
        [type]: "The file must be 5 MB or smaller.",
      }));
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadMessages((current) => ({
        ...current,
        [type]: "Choose a PDF, JPG, or PNG file.",
      }));
      return;
    }

    setUploadingType(type);

    setUploadMessages((current) => ({
      ...current,
      [type]: "",
    }));

    try {
      const response = await uploadVerificationDocument(getToken, {
        applicationId: application.id,
        verificationId: verification.id,
        documentType,
        file,
      });

      if (response.status < 200 || response.status >= 300) {
        setUploadMessages((current) => ({
          ...current,
          [type]:
            response.data?.message ??
            "Unable to upload the verification document.",
        }));
        return;
      }

      setUploadMessages((current) => ({
        ...current,
        [type]: "Document uploaded successfully.",
      }));

      setSelectedFiles((current) => ({
        ...current,
        [type]: null,
      }));
    } catch (error) {
      setUploadMessages((current) => ({
        ...current,
        [type]:
          error instanceof Error
            ? error.message
            : "Unable to upload the verification document.",
      }));
    } finally {
      setUploadingType(null);
    }
  }

  // STEP 2: Document verification.
  if (application) {
    return (
      <main className="min-h-screen bg-background">
        <section className="border-b bg-muted/20">
          <div className="mx-auto max-w-5xl px-5 py-9 sm:px-8 sm:py-12">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium">
              <BriefcaseBusiness className="size-4" />
              HomiCare helper registration
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Complete your verification
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Your application has been submitted. Upload the required
              documents to continue your registration.
            </p>
          </div>
        </section>

        <RegistrationProgress currentStep={2} />

        <section className="mx-auto max-w-3xl px-5 py-9 sm:px-8 sm:py-12">
          <div className="rounded-3xl border bg-card p-5 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-muted">
                <ShieldCheck className="size-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Verification documents
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Upload clear, readable PDF, JPG, or PNG files.
                  Each file must be 5 MB or smaller.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-muted/50 p-4 text-sm leading-6">
              <p className="font-medium">
                Application status: {application.status}
              </p>

              <p className="mt-1 text-muted-foreground">
                Your application will be reviewed by HomiCare.
              </p>
            </div>

            <div className="mt-7 space-y-4">
              {documentOptions.map((option) => {
                const verification = application.verifications.find(
                  (item) => item.type === option.type,
                );

                const message = uploadMessages[option.type];
                const isUploading = uploadingType === option.type;
                const uploaded =
                  message === "Document uploaded successfully.";

                return (
                  <div
                    key={option.type}
                    className="rounded-2xl border p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                        {uploaded ? (
                          <CheckCircle2 className="size-5" />
                        ) : (
                          <ShieldCheck className="size-5" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-semibold">
                            {option.label}
                          </h3>

                          {uploaded && (
                            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-950 dark:text-green-300">
                              Uploaded
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                          PDF, JPG, or PNG · Maximum 5 MB
                        </p>

                        {verification && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Verification status: {verification.status}
                          </p>
                        )}
                      </div>
                    </div>

                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      aria-label={`Choose ${option.label}`}
                      disabled={
                        isUploading || uploaded || !verification
                      }
                      onChange={(event) => {
                        const file =
                          event.currentTarget.files?.[0] ?? null;

                        setSelectedFiles((current) => ({
                          ...current,
                          [option.type]: file,
                        }));

                        setUploadMessages((current) => ({
                          ...current,
                          [option.type]: "",
                        }));
                      }}
                      className="mt-4 block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium"
                    />

                    {selectedFiles[option.type] && (
                      <p className="mt-2 break-all text-xs text-muted-foreground">
                        Selected: {selectedFiles[option.type]?.name}
                      </p>
                    )}

                    {message && (
                      <p
                        role="status"
                        className={`mt-3 text-sm ${
                          uploaded
                            ? "text-green-700 dark:text-green-400"
                            : "text-destructive"
                        }`}
                      >
                        {message}
                      </p>
                    )}

                    {!uploaded && (
                      <Button
                        type="button"
                        disabled={
                          isUploading ||
                          !selectedFiles[option.type] ||
                          !verification
                        }
                        onClick={() =>
                          void handleDocumentUpload(
                            option.type,
                            option.documentType,
                          )
                        }
                        className="mt-4 rounded-xl"
                      >
                        {isUploading ? "Uploading..." : "Upload document"}
                      </Button>
                    )}

                    {!verification && (
                      <p className="mt-3 text-sm text-destructive">
                        No verification record was returned for this
                        document category. Contact support rather than
                        submitting another application.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-dashed p-4 text-sm leading-6 text-muted-foreground">
              Phone verification is handled separately. Use dummy files
              during testing until secure document storage has been
              confirmed.
            </div>
          </div>
        </section>
      </main>
    );
  }

  // STEP 1: Application form.
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
              <BriefcaseBusiness className="size-4" />
              <span>Join the HomiCare team</span>
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Turn your skills into a{" "}
              <span className="underline decoration-2 underline-offset-8">
                trusted career.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Connect with households looking for dependable care and
              household support. Tell us about yourself and the services
              you can provide.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0" />
                Verification-focused
              </span>

              <span className="flex items-center gap-2">
                <Clock className="size-4 shrink-0" />
                Flexible availability
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-muted/40 p-6 sm:p-8">
            <div className="flex size-12 items-center justify-center rounded-2xl border bg-background">
              <UserRound className="size-6" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Your work matters.
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              HomiCare aims to help households find reliable support while
              helping professionals showcase their skills and availability.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Share your experience and skills.",
                "Choose the services you provide.",
                "Complete the application for review.",
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-background text-xs font-semibold">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-sm leading-5">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RegistrationProgress currentStep={1} />

      <section className="mx-auto max-w-4xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Helper registration
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us about yourself
          </h2>

          <p className="mt-3 leading-7 text-muted-foreground">
            Complete the details below. Your application will be reviewed
            before you can access the helper dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <section className="space-y-6">
            <SectionHeading
              number="01"
              title="Personal information"
              description="Provide your contact details."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" required>
                <input
                  name="fullName"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </Field>

              <Field label="Phone number" required>
                <div className="flex flex-row items-center justify-center gap-3">
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={20}
                    placeholder="Enter number with country code, e.g. +919876543210"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      setPhoneVerified(false);
                      setFirebaseIdToken(null);
                      setConfirmationResult(null);
                      setOtp("");
                      setOtpMessage("");
                    }}
                    disabled={phoneVerified}
                    className={inputClass}
                  />

                  {!phoneVerified && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isSendingOtp || !phone.trim()}
                      onClick={() => void handleSendOtp()}
                      className="rounded-xl"
                    >
                      {isSendingOtp ? "Sending OTP..." : confirmationResult ? "Resend OTP" : "Send OTP"}
                    </Button>
                  )}

                  {confirmationResult && !phoneVerified && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(event) =>
                          setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        className={inputClass}
                      />

                      <Button
                        type="button"
                        disabled={isVerifyingOtp || otp.length !== 6}
                        onClick={() => void handleVerifyOtp()}
                        className="rounded-xl"
                      >
                        {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                      </Button>
                    </div>
                  )}

                  <div id="recaptcha-container" />

                  {otpMessage && (
                    <p
                      role="status"
                      className={`text-sm ${
                        phoneVerified
                          ? "text-green-700 dark:text-green-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      {otpMessage}
                    </p>
                  )}

                  {phoneVerified && (
                    <p className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                      <CheckCircle2 className="size-4" />
                      Phone number verified
                    </p>
                  )}
                </div>
              </Field>
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading
              number="02"
              title="Your location"
              description="Tell us where you can provide services."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="City" required>
                <input
                  name="city"
                  required
                  maxLength={100}
                  placeholder="e.g. Mumbai"
                  className={inputClass}
                />
              </Field>

              <Field label="Area or locality" required>
                <input
                  name="area"
                  required
                  maxLength={100}
                  placeholder="e.g. Andheri West"
                  className={inputClass}
                />
              </Field>
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading
              number="03"
              title="Services you provide"
              description="Select every service you are comfortable providing."
            />

            <div className="grid gap-3 sm:grid-cols-3">
              {serviceOptions.map((service) => {
                const selected = selectedServices.includes(service);

                return (
                  <button
                    key={service}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(service)}
                    className={`rounded-2xl border p-4 text-left text-sm font-medium transition-colors ${
                      selected
                        ? "border-foreground bg-muted"
                        : "hover:bg-muted/40"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      {service}

                      {selected && (
                        <CheckCircle2 className="size-4 shrink-0" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <Field label="Years of experience" required>
              <select
                name="experience"
                required
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  Select your experience
                </option>
                <option value="0">No previous experience</option>
                <option value="1">Less than 1 year</option>
                <option value="2">1–2 years</option>
                <option value="3">3–5 years</option>
                <option value="6">More than 5 years</option>
              </select>
            </Field>
          </section>

          <section className="space-y-6">
            <SectionHeading
              number="04"
              title="Availability"
              description="Choose the arrangements that work for you."
            />

            <Field label="Preferred work arrangement" required>
              <select
                name="availability"
                required
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  Select an arrangement
                </option>

                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Additional experience or information">
              <textarea
                name="experienceDetails"
                rows={4}
                maxLength={2000}
                placeholder="Describe your skills, previous work, or preferred schedule."
                className={`${inputClass} resize-y`}
              />
            </Field>
          </section>

          <section className="rounded-2xl border bg-muted/20 p-5 sm:p-6">
            <label className="flex items-start gap-3 text-sm leading-6">
              <input
                type="checkbox"
                name="declaration"
                required
                className="mt-1 size-4 shrink-0 accent-foreground"
              />

              <span>
                I confirm that the information provided is accurate and
                understand that HomiCare may request additional details
                and verification before approving my application.
              </span>
            </label>
          </section>

          {errorMessage && (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm leading-6 text-destructive"
            >
              {errorMessage}
            </div>
          )}

          <div className="space-y-4 border-t pt-6">
            <Button
              type="submit"
              disabled={isSubmitting || !isLoaded}
              className="h-12 w-full rounded-xl text-sm font-semibold sm:w-auto sm:min-w-56"
            >
              {isSubmitting ? "Saving application..." : "Save & Next"}
              {!isSubmitting && (
                <ArrowRight className="ml-2 size-4" />
              )}
            </Button>

            <p className="text-xs leading-5 text-muted-foreground">
              Step 1 of 2 · Your application details will be saved before
              you continue to document upload.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

function RegistrationProgress({
  currentStep,
}: {
  currentStep: 1 | 2;
}) {
  const steps = [
    { number: 1, title: "Your details", description: "Application form" },
    { number: 2, title: "Documents", description: "Verification upload" },
  ];

  return (
    <section aria-label="Registration progress" className="border-b">
      <div className="mx-auto max-w-5xl px-5 py-5 sm:px-8 sm:py-6">
        <div className="mb-3 flex items-center justify-between text-xs font-medium text-muted-foreground sm:text-sm">
          <span>Registration progress</span>
          <span>Step {currentStep} of 2</span>
        </div>

        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-300"
            style={{
              width: currentStep === 1 ? "50%" : "100%",
            }}
          />
        </div>

        <ol className="grid grid-cols-2 gap-4">
          {steps.map((step) => {
            const active = currentStep === step.number;
            const complete = currentStep > step.number;

            return (
              <li key={step.number} className="flex items-center gap-3">
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                    active || complete
                      ? "border-foreground bg-foreground text-background"
                      : "bg-background text-muted-foreground"
                  }`}
                >
                  {complete ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    step.number
                  )}
                </span>

                <span className="min-w-0">
                  <span
                    className={`block text-sm font-semibold ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>

                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {step.description}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold">
        {number}
      </span>

      <div className="min-w-0">
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
        {required && (
          <span className="ml-1 text-muted-foreground">*</span>
        )}
      </label>

      {children}
    </div>
  );
}