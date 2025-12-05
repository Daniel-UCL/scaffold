// src/components/talent-discovery/StudentView.tsx
type TalentDiscoveryViewProps = {
  title: string;
  description: string;
};

export default function TalentDiscoveryStudentView({
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
        This is the student-facing view of Talent Discovery. Here you will be
        able to browse job opportunities, internships, and early-career roles
        curated for UCL Computer Science students.
      </p>

      {/* Add student-specific UI here */}
    </section>
  );
}
