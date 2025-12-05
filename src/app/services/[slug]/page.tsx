// src/app/services/[slug]/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  services,
  getServiceBySlug,
  getRelatedServices,
} from "@/content/services";
import { pathways } from "@/content/pathways";

type ServicePageProps = {
  // In Next.js 16 app router, params is a Promise
  params: Promise<{ slug: string }>;
};

// Pre-generate all service slugs so /services/[slug] pages are statically built
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: ServicePageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service not found – Alliances (UCL Computer Science)",
    };
  }

  return {
    title: `${service.title} – Alliances (UCL Computer Science)`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const related = getRelatedServices(service);

  // Look up full pathway objects so we can show titles + links
  const servicePathways = pathways.filter((p) =>
    service.pathways?.includes(p.slug),
  );

  // "Coming soon" logic: treat missing actionUrl or "/404/" as placeholder
  const isComingSoon =
    !service.actionUrl || service.actionUrl === "/404/";

  const actionHref = isComingSoon
    ? `/access-denied?reason=coming-soon&service=${encodeURIComponent(
        service.slug,
      )}`
    : service.actionUrl!;

  const isExternal =
    !isComingSoon && /^https?:\/\//i.test(actionHref);

  return (
    <article className="service">
      <header>
        <h1>{service.title}</h1>
        {service.description && <p>{service.description}</p>}
      </header>

      {/* Action button:
          - if real URL: go there (internal or external)
          - if "coming soon": routes to /access-denied?reason=coming-soon
       */}
      {service.actionUrl && (
        <p>
          {isExternal ? (
            <a
              className="btn"
              href={actionHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {service.actionLabel ?? "Learn more"}
            </a>
          ) : (
            <Link className="btn" href={actionHref}>
              {service.actionLabel ?? "Learn more"}
            </Link>
          )}
        </p>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <section className="related-services">
          <h2>Related services</h2>
          <ul className="list-plain cluster">
            {related.map((s) => (
              <li key={s.slug}>
                <Link className="pill" href={`/services/${s.slug}`}>
                  {s.navLabel ?? s.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <hr />

      <h3>Service information</h3>

      {service.audience?.length > 0 && (
        <p>
          <strong>Audience:</strong> {service.audience.join(", ")}
        </p>
      )}

      {servicePathways.length > 0 && (
        <p>
          <strong>Pathway(s):</strong>{" "}
          {servicePathways.map((p, idx) => (
            <React.Fragment key={p.slug}>
              <Link href={`/pathways/${p.slug}`}>{p.title}</Link>
              {idx < servicePathways.length - 1 && ", "}
            </React.Fragment>
          ))}
        </p>
      )}
    </article>
  );
}
