// src/components/SignInForm.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

type SignInFormProps = {
  redirectToHomeOnSuccess?: boolean;
};

export default function SignInForm({
  redirectToHomeOnSuccess = false,
}: SignInFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already signed in, don’t render the form again.
  if (status === "authenticated" && session?.user) {
    return (
      <section
        className="signin-section"
        aria-label="You are already signed in"
      >
        <p>
          You are signed in as{" "}
          <strong>{session.user.name ?? session.user.email}</strong>.
        </p>
      </section>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const callbackUrl = searchParams.get("callbackUrl") ?? "/";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setSubmitting(false);

    if (!result) {
      setError("Unexpected error. Please try again.");
      return;
    }

    if (result.error) {
      setError(result.error);
      return;
    }

    if (redirectToHomeOnSuccess) {
      router.push("/");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <section className="signin-section" aria-label="Sign in form">
      <h2 className="signin-heading">Sign in</h2>

      <form onSubmit={handleSubmit} className="signin-form">
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-group">
          <label htmlFor="signin-email">Email address</label>
          <input
            id="signin-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={submitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="signin-password">Password</label>
          <input
            id="signin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={submitting}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="primary-button"
          disabled={submitting}
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </section>
  );
}
