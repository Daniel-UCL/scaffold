import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { userCanAccessApp } from "@/lib/access-control";

export default async function TalentDiscoveryPage() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/sign-in?callbackUrl=/talent-discovery");
  }

  const userId = (session.user as any).id as string;

  const canAccess = await userCanAccessApp(userId, "TALENT_DISCOVERY");

  if (!canAccess) {
    redirect("/access-denied");
  }

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
