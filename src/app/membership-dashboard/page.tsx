// src/app/membership-dashboard/page.tsx
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import {
  getAdminDashboardSummary,
  getMemberDashboardData,
} from "@/lib/membership-dashboard";
import AdminDashboard from "@/components/membership-dashboard/AdminDashboard";
import MemberDashboard from "@/components/membership-dashboard/MemberDashboard";
import SignInForm from "@/components/SignInForm";
import { pageCopy } from "@/content/pageCopy";
import { userCanAccessApp } from "@/lib/access-control";

export default async function MembershipDashboardPage() {
  const copy = pageCopy.membershipDashboard;
  const session = await getServerAuthSession();

  // 1) Not signed in → public description + sign-in form
  if (!session || !session.user) {
    return (
      <section className="content-section">
        <header className="content-header">
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </header>

        {copy.unauthenticatedIntro && <p>{copy.unauthenticatedIntro}</p>}

        <SignInForm defaultRedirect="/membership-dashboard" />
      </section>
    );
  }

  const userId = (session.user as any).id as string;
  const roleKeys = ((session.user as any).roleKeys ?? []) as string[];
  const isAdmin = roleKeys.includes("ADMIN");

  // 2) Enforce app access rules (for non-admin users)
  if (!isAdmin) {
    const canAccess = await userCanAccessApp(
      userId,
      "MEMBERSHIP_DASHBOARD",
    );

    if (!canAccess) {
      redirect(
        "/access-denied?reason=access-denied&appKey=MEMBERSHIP_DASHBOARD",
      );
    }
  }

  // 3) Admin view
  if (isAdmin) {
    const summary = await getAdminDashboardSummary();
    return (
      <AdminDashboard
        {...summary}
        title={copy.adminTitle ?? copy.title}
        intro={copy.adminIntro}
      />
    );
  }

  // 4) Member view
  const memberData = await getMemberDashboardData(userId);

  if (!memberData) {
    return (
      <section className="content-section">
        <header className="content-header">
          <h1>{copy.title}</h1>
        </header>
        <p>We could not find your user record.</p>
      </section>
    );
  }

  return <MemberDashboard {...memberData} />;
}
