// src/app/ixn-workflow-manager/page.tsx
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { userCanAccessApp } from "@/lib/access-control";
import SignInForm from "@/components/SignInForm";

export default async function IxnWorkflowManagerPage() {
  const session = await getServerAuthSession();

  // 1. Not signed in: marketing + embedded sign-in
  if (!session || !session.user) {
    return (
      <section className="content-section">
        <header className="content-header">
          <h1>IXN Workflow Manager</h1>
          <p>
            The IXN Workflow Manager supports partners, academics, and module
            leaders to propose, allocate, and track real-world projects
            integrated into teaching.
          </p>
        </header>

        <p>
          Silver, Gold, and Platinum members can access the full IXN app. Sign
          in below using your Alliances account.
        </p>

        <SignInForm defaultRedirect="/ixn-workflow-manager" />
      </section>
    );
  }

  // 2. Signed in: enforce access rules
  const userId = (session.user as any).id as string;
  const canAccess = await userCanAccessApp(userId, "IXN_WORKFLOW_MANAGER");

  if (!canAccess) {
    redirect("/access-denied");
  }

  // 3. Signed in and allowed: show app landing
  return (
    <section className="content-section">
      <header className="content-header">
        <h1>IXN Workflow Manager</h1>
      </header>

      <p>
        This is the IXN app landing page, available to Silver, Gold, and
        Platinum members. In later phases, this will show IXN projects,
        proposals, and approvals.
      </p>
    </section>
  );
}
