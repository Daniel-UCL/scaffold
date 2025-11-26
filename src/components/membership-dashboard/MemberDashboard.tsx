// src/components/membership-dashboard/MemberDashboard.tsx
type MemberDashboardProps = {
  firstName: string;
  organisationName: string | null;
  tierLabel: string;
  redeemedBenefitCodes: string[];
};

export default function MemberDashboard({
  firstName,
  organisationName,
  tierLabel,
  redeemedBenefitCodes,
}: MemberDashboardProps) {
  return (
    <section className="content-section">
      <header className="content-header">
        <h1>Membership Dashboard</h1>
      </header>

      <p>
        Hello <strong>{firstName}</strong>, welcome back to the Alliances
        Platform.
      </p>

      <p>
        Organisation: <strong>{organisationName ?? "Unknown"}</strong>
        <br />
        Membership Tier: <strong>{tierLabel}</strong>
        <br />
        Redeemed Benefits:{" "}
        <strong>
          {redeemedBenefitCodes.length
            ? redeemedBenefitCodes.join(", ")
            : "None"}
        </strong>
      </p>
    </section>
  );
}
