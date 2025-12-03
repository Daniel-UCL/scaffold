// src/app/release-notes/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { releases } from "@/content/releases";

type ReleasePageParams = {
  slug: string;
};

type ReleasePageProps = {
  // In Next.js 16 app router, `params` is a Promise
  params: Promise<ReleasePageParams>;
};

function findReleaseBySlugOrVersion(rawSlug: string) {
  const slug = decodeURIComponent(rawSlug).toLowerCase();

  // First, try direct slug match (e.g. "v0-1-0")
  let release =
    releases.find((r) => r.slug.toLowerCase() === slug) ?? null;

  if (!release) {
    // Fallbacks: e.g. someone manually types /release-notes/0.1.0
    release =
      releases.find((r) => r.version === rawSlug) ??
      releases.find(
        (r) => `v${r.version.replace(/\./g, "-")}`.toLowerCase() === slug,
      ) ??
      null;
  }

  return release;
}

export function generateStaticParams() {
  // Pre-generate known slugs (v0-1-0, v0-1-1, etc.)
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata(
  { params }: ReleasePageProps,
): Promise<Metadata> {
  const { slug } = await params; // ✅ unwrap params
  const release = findReleaseBySlugOrVersion(slug);

  if (!release) {
    return {
      title: "Release not found – Alliances (UCL Computer Science)",
    };
  }

  return {
    title: `Version ${release.version} – Alliances (UCL Computer Science)`,
    description: `Release notes for version ${release.version} of the Alliances website.`,
  };
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { slug } = await params; // ✅ unwrap params
  const release = findReleaseBySlugOrVersion(slug);

  if (!release) {
    notFound();
  }

  const dateLabel = new Date(release.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="release">
      <h1>Version {release.version}</h1>
      <p>
        <strong>Released on:</strong> {dateLabel}
        <br />
        <strong>Status:</strong> {release.status}
      </p>

      <section>
        <h2>Highlights</h2>
        <ul>
          {release.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Fixes</h2>
        <ul>
          {release.fixes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
