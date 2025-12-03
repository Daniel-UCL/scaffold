// src/app/release-notes/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getReleasesSorted } from "@/content/releases";

export const metadata: Metadata = {
  title: "Release notes – Alliances (UCL Computer Science)",
  description:
    "Summary of major changes to the Alliances website, with a link to the full history.",
};

export default function ReleaseNotesHomePage() {
  const releases = getReleasesSorted();
  const latestThree = releases.slice(0, 3);

  return (
    <article className="release-notes-home">
      <h1>Release notes</h1>

      <p>
        This page summarises the major changes to the Alliances website. For a
        full history, see the complete change log.
      </p>

      <h2>Change log</h2>
      <ul className="releases">
        {latestThree.map((release) => {
          const dateLabel = new Date(release.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return (
            <li key={release.slug}>
              <Link href={`/release-notes/${release.slug}`}>
                Version {release.version}: Released on {dateLabel} as a{" "}
                {release.status} version
              </Link>
            </li>
          );
        })}
      </ul>

      <p>
        <Link href="/release-notes/all">
          View all releases &rarr;
        </Link>
      </p>

      <section>
        <h2>Our Digital Experience Roadmap</h2>
        <p>
          The digital experience journey offered by the Alliances team looks
          something like this…
        </p>

        {/* Placeholder for future timeline graphic */}

        <h3>System architecture and design (October 2025 to April 2026)</h3>
        <ul>
          <li>System foundation and scaffolding</li>
          <li>System integration (e.g. unified database and SSO)</li>
        </ul>

        <h3>
          Phase 1: Static information displays &amp; tools for monitoring and
          redeeming entry-level FoCS benefits (October 2025 to April 2026)
        </h3>
        <ul>
          <li>Dashboard for membership benefits</li>
          <li>
            Work opportunity interface (job board) e.g. IXN Pro internships
          </li>
        </ul>

        <h3>
          Phase 2: Management systems for event, learning content, customer
          relation, contract, and IXN data management (October 2025 to October
          2026)
        </h3>
        <ul>
          <li>IXN Workflow Manager for partners with data management</li>
          <li>Event management system</li>
          <li>Alliances CRM</li>
          <li>IXN Workflow Manager (continuous development)</li>
        </ul>

        <h3>
          Phase 3: Advanced (Gold+) benefit retrieval and tracker tools for
          members of FoCS (October 2026 to January 2027)
        </h3>
        <ul>
          <li>ExecEd shop front &amp; dashboard</li>
          <li>
            Work opportunity interface (continuous development) e.g. CV Library
            features
          </li>
        </ul>

        <h3>
          Phase 4: Networking tools with profile management (January 2027 to
          April 2027)
        </h3>
        <ul>
          <li>Time barter for innovation</li>
          <li>Meet a co-founder App</li>
          <li>Mentoring App</li>
        </ul>

        <h3>
          Nice to have: Subject to additional development resource (cycle
          through phase 1–4)
        </h3>
        <ul>
          <li>Knowledge base for UCL CS innovation</li>
          <li>
            Learning management system (Innovation &amp; Entrepreneurship) for
            UCL CS
          </li>
        </ul>
      </section>
    </article>
  );
}
