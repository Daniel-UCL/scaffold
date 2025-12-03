// src/app/release-notes/all/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getReleasesSorted } from "@/content/releases";

export const metadata: Metadata = {
  title: "All release notes – Alliances (UCL Computer Science)",
  description: "Complete change log for the Alliances website.",
};

export default function AllReleasesPage() {
  const releases = getReleasesSorted();

  return (
    <article>
      <h1>All release notes</h1>
      <ul className="releases">
        {releases.map((release) => {
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
    </article>
  );
}
