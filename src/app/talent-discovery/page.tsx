// src/app/talent-discovery/page.tsx
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { userCanAccessApp } from "@/lib/access-control";
import SignInForm from "@/components/SignInForm";

export default async function TalentDiscoveryPage() {
  const session = await getServerAuthSession();

  // 1. Not signed in: marketing + embedded sign-in
  if (!session || !session.user) {
    return (
      <section className="content-section">
        <header className="content-header">
          <h1>Talent Discovery</h1>
          <p>
            Talent Discovery helps partners find students and graduates with the
            right skills, interests, and values for internships and early-career
            roles.
          </p>
        </header>

        <p>
          Gold and Platinum members can access the full Talent Discovery app.
          Sign in below to view your tailored talent tools.
        </p>

        <SignInForm defaultRedirect="/talent-discovery" />
      </section>
    );
  }

  // 2. Signed in: enforce access rules
  const userId = (session.user as any).id as string;
  const canAccess = await userCanAccessApp(userId, "TALENT_DISCOVERY");

  if (!canAccess) {
    redirect("/access-denied");
  }

  // 3. Signed in and allowed: show app landing
  return (
    <section className="content-section">
      <header className="content-header">
        <h1>Talent Discovery</h1>
      </header>

      <p>
        This is the Talent Discovery app landing page, available to Gold and
        Platinum members. In later phases, this will surface candidate profiles,
        interest signals, and shortlisting tools.
      </p>
    </section>
  );
}
