// src/components/talent-discovery/PartnerFullView.tsx
type TalentDiscoveryViewProps = {
  title: string;
  description: string;
};

export default function TalentDiscoveryPartnerFullView({
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
        Full view: As a Gold or Platinum member, you have access to both the Alliances job
        board and the CV Library to discover emerging talent from UCL Computer
        Science.
      </p>

      {/* Add full partner UI here: job board + CV Library features */}
    </section>
  );
}
