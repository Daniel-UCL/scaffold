import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { userCanAccessApp } from "@/lib/access-control";

export default async function IxnWorkflowManagerPage() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/sign-in?callbackUrl=/ixn-workflow-manager");
  }

  const userId = (session.user as any).id as string;

  const canAccess = await userCanAccessApp(userId, "IXN_WORKFLOW_MANAGER");

  if (!canAccess) {
    redirect("/access-denied");
  }

  return (
    <section className="content-section">
      <header className="content-header">
        <h1>IXN Workflow Manager</h1>
      </header>

      <p>
        This is the IXN app landing page, available to Silver, Gold, and
        Platinum members. In later phases, this will show your IXN projects,
        proposals, and approvals.
      </p>
    </section>
  );
}
