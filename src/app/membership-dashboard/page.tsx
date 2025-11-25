// src/app/membership-dashboard/page.tsx
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { prisma } from "@/lib/prisma";

export default async function MembershipDashboardPage() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/sign-in?callbackUrl=/membership-dashboard");
  }

  const userId = (session.user as any).id as string;
  const roleKeys = ((session.user as any).roleKeys ?? []) as string[];

  const isAdmin = roleKeys.includes("ADMIN");

  if (isAdmin) {
    // ADMIN VIEW: show total member counts per tier for users with a "MEMBER" role
    const memberRole = await prisma.role.findUnique({
      where: { key: "MEMBER" }, // ensure this role exists in your seed
    });

    const tierCounts = await prisma.membershipTier.findMany({
      orderBy: { rank: "asc" },
      include: {
        memberships: {
          where: {
            isActive: true,
            user: memberRole
              ? {
                  roles: {
                    some: { roleId: memberRole.id },
                  },
                }
              : undefined,
          },
        },
      },
    });

    const totalMembers = tierCounts.reduce(
      (sum, tier) => sum + tier.memberships.length,
      0
    );

    return (
      <section className="content-section">
        <header className="content-header">
          <h1>Membership Dashboard – Admin View</h1>
        </header>

        <p>
          There are currently <strong>{totalMembers}</strong> registered users
          with the <strong>MEMBER</strong> role across all tiers.
        </p>

        <ul>
          {tierCounts.map((tier) => (
            <li key={tier.id}>
              <strong>{tier.label}</strong>: {tier.memberships.length} members
            </li>
          ))}
        </ul>
      </section>
    );
  }

  // MEMBER VIEW: personalised welcome
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      organisation: true,
      memberships: {
        where: { isActive: true },
        include: { membershipTier: true },
      },
      membershipDashboardMember: true,
    },
  });

  if (!user) {
    return (
      <section className="content-section">
        <h1>Membership Dashboard</h1>
        <p>We could not find your user record.</p>
      </section>
    );
  }

  const membership = user.memberships.at(0) ?? null;
  const tierLabel = membership?.membershipTier.label ?? "Unknown tier";
  const redeemedCodes =
    user.membershipDashboardMember?.redeemedBenefitCodes ?? [];

  return (
    <section className="content-section">
      <header className="content-header">
        <h1>Membership Dashboard</h1>
      </header>

      <p>
        Hello <strong>{user.firstName}</strong>, welcome back to the Alliances
        Platform.
      </p>

      <p>
        Organisation: <strong>{user.organisation?.name ?? "Unknown"}</strong>
        <br />
        Membership Tier: <strong>{tierLabel}</strong>
        <br />
        Redeemed Benefits:{" "}
        <strong>
          {redeemedCodes.length ? redeemedCodes.join(", ") : "None"}
        </strong>
      </p>

      <p>
        (Phase 2 placeholder) Navigation items for IXN and Talent Discovery are
        protected according to your membership tier.
      </p>
    </section>
  );
}
