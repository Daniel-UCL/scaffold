// src/components/membership-dashboard/AdminDashboard.tsx
import type { AdminDashboardSummary } from "@/lib/membership-dashboard";

type AdminDashboardProps = AdminDashboardSummary;

export default function AdminDashboard({
  totalMembers,
  tiers,
}: AdminDashboardProps) {
  return (
    <section className="content-section">
      <header className="content-header">
        <h1>Membership Dashboard – Admin View</h1>
      </header>

      <p>
        There are currently <strong>{totalMembers}</strong> registered users
        with the <strong>MEMBER</strong> role across all membership tiers.
      </p>

      <ul>
        {tiers.map(({ id, label, count }) => (
          <li key={id}>
            <strong>{label}</strong>: {count} members
          </li>
        ))}
      </ul>
    </section>
  );
}
