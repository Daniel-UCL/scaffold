// src/app/membership-dashboard/page.tsx
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { getAdminDashboardSummary, getMemberDashboardData } from "@/lib/membership-dashboard";
import AdminDashboard from "@/components/membership-dashboard/AdminDashboard";
import MemberDashboard from "@/components/membership-dashboard/MemberDashboard";
import SignInForm from "@/components/SignInForm";

export default async function MembershipDashboardPage() {
  const session = await getServerAuthSession();

  // 1. Not signed in: show landing + embedded sign-in form
  if (!session || !session.user) {
    return (
      <section className="content-section">
        <header className="content-header">
          <h1>Membership Dashboard</h1>
          <p>
            The Membership Dashboard gives you a single place to review your
            partnership details, membership tier, and access to Alliances apps
            such as IXN Workflow Manager and Talent Discovery.
          </p>
        </header>

        <p>
          Sign in below with your Alliances account to access your dashboard.
        </p>

        <SignInForm defaultRedirect="/membership-dashboard" />
      </section>
    );
  }

  // 2. Signed in: decide which dashboard view to show
  const userId = (session.user as any).id as string;
  const roleKeys = ((session.user as any).roleKeys ?? []) as string[];
  const isAdmin = roleKeys.includes("ADMIN");

  if (isAdmin) {
    const summary = await getAdminDashboardSummary();
    return <AdminDashboard {...summary} />;
  }

  const memberData = await getMemberDashboardData(userId);

  if (!memberData) {
    return (
      <section className="content-section">
        <h1>Membership Dashboard</h1>
        <p>We could not find your user record.</p>
      </section>
    );
  }

  return <MemberDashboard {...memberData} />;
}
