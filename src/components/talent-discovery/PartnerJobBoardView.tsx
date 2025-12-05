// src/components/talent-discovery/PartnerJobBoardView.tsx
type TalentDiscoveryViewProps = {
  title: string;
  description: string;
};

export default function TalentDiscoveryPartnerJobBoardView({
  title,
  description,
}: TalentDiscoveryViewProps) {
  return (
    <section className="content-section">
      <header className="content-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <p>
        Job board for partners: This view gives you access to the Alliances job board to advertise work
        opportunities such as internships, short-term roles, and graduate
        positions.
      </p>

      {/* Add partner job-board-only UI here */}
    </section>
  );
}
