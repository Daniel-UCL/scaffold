// src/lib/access-control.ts
import { prisma } from "@/lib/prisma";

export async function userCanAccessApp(userId: string, appKey: string) {
  const [user, app] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberships: {
          where: { isActive: true },
          include: { membershipTier: true },
        },
      },
    }),
    prisma.app.findUnique({
      where: { key: appKey },
      include: {
        appAccessRules: {
          include: {
            minMembershipTier: true,
          },
        },
      },
    }),
  ]);

  if (!user || !app) return false;

  const activeMemberships = user.memberships.filter((m) => m.isActive);
  if (!activeMemberships.length) return false;

  const highest = activeMemberships.reduce((best, current) => {
    if (!best) return current;
    return current.membershipTier.rank > best.membershipTier.rank
      ? current
      : best;
  }, activeMemberships[0]);

  const userRank = highest.membershipTier.rank;
  const rules = app.appAccessRules;

  // No rules → default deny (you can change this policy if preferred)
  if (!rules.length) return false;

  // If any ALLOW rule with minMembershipTier rank <= userRank, allow
  const allowMatch = rules.some((rule) => {
    if (rule.accessType !== "ALLOW") return false;
    const minRank = rule.minMembershipTier?.rank;
    if (minRank == null) return false;
    return userRank >= minRank;
  });

  return allowMatch;
}
