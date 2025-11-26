// src/components/SignInForm.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession, getSession } from "next-auth/react";

type SignInFormProps = {
  /**
   * Fallback redirect if no ?callbackUrl=... is present
   * AND no role-based redirect applies.
   */
  defaultRedirect?: string;
};

// Role → landing page mapping (in priority order)
const ROLE_REDIRECTS: Array<{ key: string; path: string }> = [
  { key: "ADMIN", path: "/membership-dashboard" },
  { key: "MEMBER", path: "/membership-dashboard" },
  { key: "ACADEMIC", path: "/ixn-workflow-manager" },
  { key: "MODULE_LEADER", path: "/ixn-workflow-manager" },
];

function getRoleBasedRedirect(roleKeys: string[] | undefined | null): string | null {
  if (!roleKeys || roleKeys.length === 0) return null;
  for (const { key, path } of ROLE_REDIRECTS) {
    if (roleKeys.includes(key)) return path;
  }
  return null;
}

export default function SignInForm({ defaultRedirect = "/" }: SignInFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already signed in, show a simple status instead of the form
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

    const requestedCallbackUrl = searchParams.get("callbackUrl") ?? null;

    // First, perform credential sign-in (no automatic redirect)
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: requestedCallbackUrl ?? defaultRedirect ?? "/",
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

    // Success: decide where to send the user
    if (requestedCallbackUrl) {
      // If we came here because a protected page sent us, honour that
      router.push(requestedCallbackUrl);
      return;
    }

    // Otherwise: use role-based landing, falling back to defaultRedirect
    const freshSession = await getSession();
    const roleKeys =
      (freshSession?.user as any)?.roleKeys as string[] | undefined;

    const roleTarget = getRoleBasedRedirect(roleKeys);
    const finalUrl = roleTarget ?? defaultRedirect ?? "/";

    router.push(finalUrl);
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
