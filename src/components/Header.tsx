// src/components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import MainNav from "@/components/MainNav";
import { siteAnnouncement } from "@/content/siteMeta";

export default function Header() {
  const ann = siteAnnouncement;

  return (
    <header className="banner" role="banner">
      <div className="banner-top">
        <a
          className="logo"
          href="https://www.ucl.ac.uk/engineering/computer-science"
        >
          <Image
            src="/images/UCL-Computer-Science-logo.jpg"
            alt="UCL Computer Science"
            width={200}
            height={40}
            priority
          />
        </a>

        <div className="team-name">ALLIANCES</div>

        <div className="announce-wrap">
          {ann.enabled && ann.text && (
            <div className="lcd-announcement" role="status" aria-live="polite">
              <div className="lcd-text">{ann.text}</div>

              {ann.ctaLabel && ann.ctaHref && (
                <Link className="btn btn--primary lcd-cta" href={ann.ctaHref}>
                  {ann.ctaLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="banner-nav">
        <MainNav />
      </div>
    </header>
  );
}
